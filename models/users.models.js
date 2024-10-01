const format = require("pg-format");
const db = require("../db/connection");
const { checkIfNum, checkExists } = require("../db/utils/utils");

exports.accessUsers = () => {
  return db.query("SELECT * FROM users").then(({ rows }) => {
    return rows;
  });
};

exports.accessUser = (user_id) => {
  if (checkIfNum(user_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        queryStr = format("SELECT * FROM users WHERE user_id = %L;", user_id);
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.removeUser = (user_id) => {
  const query = format("DELETE FROM users WHERE user_id = %L RETURNING *;", user_id);

  console.log(query)

  return db.query(query)
  .then((result) => {
      if (result.rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'not found' });
      }
      return result.rows[0];
    });
};
