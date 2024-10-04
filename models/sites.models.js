const format = require("pg-format");
const db = require("../db/connection");
const {
  checkIfNum,
  checkExists,
  coordinatesToNumbers,
} = require("../db/utils/utils");

exports.accessSites = () => {
  return db
    .query(
      "SELECT poptable.img_url, poptable.post_user_id, poptable.post_id, poptable.created_at, poptable.body, poptable.likes_count AS post_likes_count, sites.site_id, sites.latitude, sites.longitude FROM (SELECT a.* FROM (select posts.img_url, posts.user_id AS post_user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) AS likes_count FROM posts RIGHT JOIN postlikes ON postlikes.post_id = posts.post_id GROUP BY posts.post_id) a LEFT OUTER JOIN (select posts.img_url, posts.user_id AS post_user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) AS likes_count FROM posts RIGHT JOIN postlikes ON postlikes.post_id = posts.post_id GROUP BY posts.post_id) b ON a.site_id = b.site_id AND a.likes_count < b.likes_count WHERE b.site_id IS NULL) poptable FULL OUTER JOIN sites ON poptable.site_id = sites.site_id ORDER BY sites.site_id;"
    )
    .then(({ rows }) => {
      return rows.map(coordinatesToNumbers);
    });
};

exports.accessSite = (site_id) => {
  if (checkIfNum(site_id)) {
    return checkExists("sites", "site_id", site_id)
      .then(() => {
        queryStr = format(
          "SELECT poptable.img_url, poptable.post_user_id, poptable.post_id, poptable.created_at, poptable.body, poptable.likes_count AS post_likes_count, sites.site_id, sites.latitude, sites.longitude FROM (SELECT a.* FROM (select posts.img_url, posts.user_id AS post_user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) AS likes_count FROM posts RIGHT JOIN postlikes ON postlikes.post_id = posts.post_id GROUP BY posts.post_id) a LEFT OUTER JOIN (select posts.img_url, posts.user_id AS post_user_id, posts.post_id, posts.created_at, posts.body, posts.site_id, count(posts.post_id) AS likes_count FROM posts RIGHT JOIN postlikes ON postlikes.post_id = posts.post_id GROUP BY posts.post_id) b ON a.site_id = b.site_id AND a.likes_count < b.likes_count WHERE b.site_id IS NULL) poptable FULL OUTER JOIN sites ON poptable.site_id = sites.site_id WHERE sites.site_id = %L",
          site_id
        );
        return db.query(queryStr);
      })
      .then(({ rows }) => {
        return coordinatesToNumbers(rows[0]);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  } else {
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
};

exports.insertSite = (site) => {
  const formattedSite = [site.user_id, site.longitude, site.latitude];

  const query = format(
    `
    INSERT INTO sites(user_id, longitude, latitude)
    VALUES(%L)
    RETURNING *`,
    formattedSite
  );

  return db.query(query).then((result) => {
    return result.rows[0];
  });
};

exports.removeSite = (site_id) => {
  const query = format(
    "DELETE FROM sites WHERE site_id = %L RETURNING *;",
    site_id
  );

  return db.query(query).then((result) => {
    if (result.rows.length === 0) {
      return Promise.reject({ status: 404, msg: "not found" });
    }
    return result.rows[0];
  });
};
