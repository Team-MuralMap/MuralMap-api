const format = require("pg-format");
const db = require("../db/connection");
const { checkIfNum, checkExists } = require("../db/utils/utils");

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

exports.insertPost = ({ img_url, author_id, body, site_id }) => {
  if (img_url && body && checkIfNum(author_id) && checkIfNum(site_id)) {
    return checkExists("users", "user_id", author_id)
      .then(() => {
        return checkExists("sites", "site_id", site_id);
      })
      .then(() => {
        queryStr = format(
          "INSERT INTO posts (img_url, author_id, body, site_id) VALUES (%L) RETURNING *;",
          [img_url, author_id, body, site_id]
        );
        return db.query(queryStr);
      })
      .then((result) => {
        return result.rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.updatePostByPostId = ({ body }, post_id) => {
  if (checkIfNum(post_id)) {
    return checkExists("posts", "post_id", post_id)
      .then(() => {
        queryStr = format(
          "UPDATE posts SET body = '%s' WHERE post_id = %L RETURNING *;",
          body,
          post_id
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

exports.removePostByPostId = (post_id) => {
  if (checkIfNum(post_id)) {
    return checkExists("posts", "post_id", post_id)
      .then(() => {
        queryStr = format("DELETE FROM posts WHERE post_id = %L;", post_id);
        return db.query(queryStr);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
