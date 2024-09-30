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

exports.accessSite = (site_id) => {
  if (checkIfNum(site_id)) {
    return checkExists("sites", "site_id", site_id)
      .then(() => {
        queryStr = format("SELECT * FROM sites WHERE site_id = %L;", site_id);
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
