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
      `
    SELECT
      sites.*,
      (ARRAY_AGG(posts.img_url ORDER BY posts.created_at))[1] AS site_preview_url
    FROM sites LEFT JOIN posts ON sites.site_id = posts.site_id
    GROUP BY sites.site_id;
    `
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
          `SELECT
            sites.*,
            (ARRAY_AGG(posts.img_url ORDER BY posts.created_at))[1] AS site_preview_url
          FROM sites LEFT JOIN posts ON sites.site_id = posts.site_id
          WHERE sites.site_id = %L
          GROUP BY sites.site_id;
          `,
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
