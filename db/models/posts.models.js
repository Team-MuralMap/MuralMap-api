const format = require("pg-format");
const db = require("../connection");
const { checkIfNum, checkExists } = require("../utils/utils");

exports.accessPosts = () => {
  return db.query("SELECT * FROM posts").then(({ rows }) => {
    return rows;
  });
};

exports.accessPost = (post_id) => {
  if (checkIfNum(post_id)) {
    return checkExists("posts", "post_id", post_id)
      .then(() => {
        queryStr = format("SELECT * FROM posts WHERE post_id = %L;", post_id);
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
