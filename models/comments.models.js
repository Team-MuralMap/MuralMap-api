const format = require("pg-format");
const { checkIfNum, checkExists } = require("../db/utils/utils");
const db = require("../db/connection");

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

exports.accessCommentByCommentId = (comment_id) => {
  if (checkIfNum(comment_id)) {
    return checkExists("comments", "comment_id", comment_id)
      .then(() => {
        queryStr = format(
          "SELECT * FROM comments WHERE comment_id = %L;",
          comment_id
        );
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

exports.insertCommentByPostId = ({ body, user_id, reply_to }, post_id) => {
  if (body && checkIfNum(post_id) && checkIfNum(user_id)) {
    return checkExists("posts", "post_id", post_id)
      .then(() => {
        return checkExists("users", "user_id", user_id);
      })
      .then(() => {
        queryStr = format(
          "INSERT INTO comments (body, post_id, user_id, reply_to) VALUES (%L) RETURNING *;",
          [body, post_id, user_id, reply_to]
        );
        return db.query(queryStr);
      })
      .then((result) => {
        return result.rows[0];
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.updateCommentByCommentId = ({ body }, comment_id) => {
  if (checkIfNum(comment_id)) {
    return checkExists("comments", "comment_id", comment_id)
      .then(() => {
        queryStr = format(
          "UPDATE comments SET body = '%s' WHERE comment_id = %L RETURNING *;",
          body,
          comment_id
        );
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

exports.removeCommentByCommentId = (comment_id) => {
  if (checkIfNum(comment_id)) {
    return checkExists("comments", "comment_id", comment_id)
      .then(() => {
        queryStr = format(
          "DELETE FROM comments WHERE comment_id = %L;",
          comment_id
        );
        return db.query(queryStr);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
