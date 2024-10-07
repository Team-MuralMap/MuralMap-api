const format = require("pg-format");
const db = require("../db/connection");
const {
  checkIfNum,
  checkExists,
  coordinatesToNumbers,
} = require("../db/utils/utils");

const partialSiteQuery = `WITH prep_1 AS (
        SELECT
            posts.img_url,
            posts.user_id AS post_user_id,
            posts.post_id,
            posts.created_at,
            posts.body,
            posts.site_id,
            COUNT(posts.post_id) AS likes_count
        FROM posts
        LEFT JOIN postlikes ON posts.post_id = postlikes.post_id
        GROUP BY posts.post_id
      )

      SELECT
        sites.*,
        (ARRAY_AGG(prep_1.img_url ORDER BY prep_1.likes_count DESC))[
            1
        ] AS site_preview_url,
        (ARRAY_AGG(prep_1.post_id ORDER BY prep_1.likes_count DESC))[
            1
        ] AS post_id
      FROM sites LEFT JOIN prep_1 ON sites.site_id = prep_1.site_id
      `;

exports.accessSites = () => {
  return db
    .query(
      partialSiteQuery +
        `
      GROUP BY sites.site_id;`
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
          partialSiteQuery +
            `
          WHERE sites.site_id = %L
          GROUP BY sites.site_id`,
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
