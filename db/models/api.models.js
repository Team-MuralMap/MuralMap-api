const db = require("../connection");
const { checkIfNum, checkExists } = require("../utils/utils");
const fs = require("fs/promises");
const format = require("pg-format");

exports.accessEndpoints = () => {
  return fs
    .readFile(`${__dirname}/../../endpoints.json`, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    });
};

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

exports.accessSites = () => {
  return db.query("SELECT * FROM sites").then(({ rows }) => {
    return rows;
  });
};
