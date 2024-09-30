const format = require("pg-format");
const { checkIfNum, checkExists } = require("../utils/utils");
const db = require("../connection");

exports.accessCommentsByPostId = (post_id) => {
  if (checkIfNum(post_id)) {
    return checkExists("comments", "post_id", post_id)
      .then(() => {
        queryStr = format(
          "SELECT * FROM comments WHERE post_id = %L;",
          post_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        return rows;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
