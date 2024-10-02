const format = require("pg-format");
const db = require("../db/connection");
const { checkIfNum, checkExists } = require("../db/utils/utils");

exports.accessPosts = ({ site_id, user_id, most_liked }) => {
  let queryStr = format("SELECT * FROM posts");
  const whereFilters = [];
  if (most_liked === "true") {
    queryStr = format(
      "select posts.img_url, posts.user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) as likes_count from posts left join postlikes on postlikes.post_id = posts.post_id" //group by posts.post_id ORDER BY COUNT(posts.post_id) DESC LIMIT 1;
    );
  }
  return Promise.resolve(() => {})
    .then(() => {
      if (site_id) {
        if (checkIfNum(site_id)) {
          whereFilters.push(`site_id = ${site_id}`);
        } else {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return true;
    })
    .then(() => {
      if (user_id) {
        if (checkIfNum(user_id)) {
          whereFilters.push(`user_id = ${user_id}`);
        } else {
          return Promise.reject({ status: 400, msg: "Bad Request" });
        }
      }
      return true;
    })
    .then(() => {
      if (whereFilters.length > 0) {
        queryStr += format(" WHERE %s", whereFilters[whereFilters.length - 1]);
        whereFilters.pop();
        whereFilters.forEach((whereFilter) => {
          queryStr += format(" AND %s", whereFilter);
        });
      }
      if (most_liked === "true") {
        queryStr += format(
          " group by posts.post_id ORDER BY COUNT(posts.post_id) DESC LIMIT 1;"
        );
      }
      //select img_url, posts.user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) as likes_count from posts left join postlikes on postlikes.post_id = posts.post_id group by posts.post_id ORDER BY COUNT(posts.post_id) DESC LIMIT 1;

      return db.query(queryStr);
    })
    .then(({ rows }) => {
      if (rows.length > 0) {
        return rows;
      }
      return Promise.reject({ status: 404, msg: "Not Found" });
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

exports.insertPost = ({ img_url, user_id, body, site_id }) => {
  if (img_url && body && checkIfNum(user_id) && checkIfNum(site_id)) {
    return checkExists("users", "user_id", user_id)
      .then(() => {
        return checkExists("sites", "site_id", site_id);
      })
      .then(() => {
        queryStr = format(
          "INSERT INTO posts (img_url, user_id, body, site_id) VALUES (%L) RETURNING *;",
          [img_url, user_id, body, site_id]
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
