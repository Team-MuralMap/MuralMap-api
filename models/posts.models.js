const format = require("pg-format");
const db = require("../db/connection");
const { checkIfNum, checkExists, checkOrder } = require("../db/utils/utils");

exports.accessPosts = ({ site_id, user_id, sort_by, order }) => {
  let queryStr = format(`select posts.*, count(posts.post_id) 
    as likes_count
    from posts
    left join postlikes on posts.post_id = postlikes.post_id`);
  const whereFilters = [];
  const sortGreenList = [
    "post_id",
    "user_id",
    "created_at",
    "site_id",
    "likes_count",
  ];

  if (site_id) {
    if (checkIfNum(site_id)) {
      whereFilters.push(`posts.site_id = ${site_id}`);
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  }
  if (user_id) {
    if (checkIfNum(user_id)) {
      whereFilters.push(`posts.user_id = ${user_id}`);
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  }

  return Promise.resolve(() => {})
    .then(() => {
      if (site_id) {
        return checkExists("sites", "site_id", site_id);
      }
      return true;
    })
    .then(() => {
      if (user_id) {
        return checkExists("users", "user_id", user_id);
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
      queryStr += format(" group by posts.post_id");
      return checkOrder(order);
    })
    .then((checkedOrder) => {
      if (sort_by) {
        if (sort_by === "likes_count") {
          queryStr += format(" ORDER BY COUNT(posts.post_id)");
        } else {
          if (sortGreenList.includes(sort_by)) {
            queryStr += format(" ORDER BY %s", sort_by);
          }
        }
        queryStr += format(" %s", checkedOrder);
      }
      return db.query(queryStr);
    })
    .then(({ rows }) => {
      return rows;
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

exports.accessPost = (post_id) => {
  if (checkIfNum(post_id)) {
    return checkExists("posts", "post_id", post_id)
      .then(() => {
        queryStr = format("select posts.*, count(posts.post_id) as likes_count from posts left join postlikes on posts.post_id = postlikes.post_id WHERE posts.post_id = %L group by posts.post_id;", post_id);
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
