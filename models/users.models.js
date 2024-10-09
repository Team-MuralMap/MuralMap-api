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

exports.accessPostlikesByUser = (user_id) => {
  if (checkIfNum(user_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        queryStr = format(
          "SELECT * FROM postlikes WHERE user_id = %L;",
          user_id
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

exports.accessPostlikeByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          "SELECT * FROM postlikes WHERE user_id = %L AND post_id = %L;",
          user_id,
          post_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.accessCommentlikesByUser = (user_id) => {
  if (checkIfNum(user_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        queryStr = format(
          "SELECT * FROM commentlikes WHERE user_id = %L;",
          user_id
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

exports.accessCommentlikeByUserAndComment = (user_id, comment_id) => {
  if (checkIfNum(user_id) && checkIfNum(comment_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("comments", "comment_id", comment_id);
      })
      .then(() => {
        queryStr = format(
          "SELECT * FROM commentlikes WHERE user_id = %L AND comment_id = %L;",
          user_id,
          comment_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.accessVisitsByUser = (user_id) => {
  if (checkIfNum(user_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        queryStr = format("SELECT * FROM visits WHERE user_id = %L;", user_id);
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

exports.accessVisitByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          "SELECT * FROM visits WHERE user_id = %L AND post_id = %L;",
          user_id,
          post_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.insertPostlikeByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          ` INSERT INTO postlikes(user_id, post_id)
    VALUES(%L)
    RETURNING *`,
          [user_id, post_id]
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

exports.insertCommentlikeByUserAndComment = (user_id, comment_id) => {
  if (checkIfNum(user_id) && checkIfNum(comment_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("comments", "comment_id", comment_id);
      })
      .then(() => {
        queryStr = format(
          ` INSERT INTO commentlikes(user_id, comment_id)
    VALUES(%L)
    RETURNING *`,
          [user_id, comment_id]
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

exports.insertVisitByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          ` INSERT INTO visits(user_id, post_id)
    VALUES(%L)
    RETURNING *`,
          [user_id, post_id]
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

exports.insertUser = (user) => {
  const formattedUser = [user.username, user.email, user.name, user.avatar_url];

  const query = format(
    `
    INSERT INTO users(username, email, name, avatar_url)
    VALUES(%L)
    RETURNING *`,
    formattedUser
  );

  return db.query(query).then((result) => {
    return result.rows[0];
  });
};

exports.removeUser = (user_id) => {
  const query = format(
    "DELETE FROM users WHERE user_id = %L RETURNING *;",
    user_id
  );

  return db.query(query).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return result.rows[0];
  });
};

exports.removePostlikeByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          ` DELETE FROM postlikes WHERE user_id = %L AND post_id = %L
    RETURNING *`,
          user_id,
          post_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.removeCommentlikeByUserAndComment = (user_id, comment_id) => {
  if (checkIfNum(user_id) && checkIfNum(comment_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("comments", "comment_id", comment_id);
      })
      .then(() => {
        queryStr = format(
          ` DELETE FROM commentlikes WHERE user_id = %L AND comment_id = %L
    RETURNING *`,
          user_id,
          comment_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.removeVisitByUserAndPost = (user_id, post_id) => {
  if (checkIfNum(user_id) && checkIfNum(post_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("posts", "post_id", post_id);
      })
      .then(() => {
        queryStr = format(
          ` DELETE FROM visits WHERE user_id = %L AND post_id = %L
    RETURNING *`,
          user_id,
          post_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        if (rows.length === 0) {
          return Promise.reject({ status: 404, msg: "Not Found" });
        }
        return rows[0];
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};
