const format = require("pg-format");
const db = require("../db/connection");
const {
  checkIfNum,
  checkExists,
  coordinatesToNumbers,
} = require("../db/utils/utils");

const partialSiteQuery = `with prep_3 as (
    select
        posts.site_id,
        COUNT(distinct visits.user_id) as visits_count
    from visits
    left join posts
        on visits.post_id = posts.post_id
    group by posts.site_id
)

select
    prep_2.*,
    COALESCE(prep_3.visits_count, 0) as visits_count
from (
    with prep_1 as (
        select
            posts.*,
            COUNT(posts.post_id) as likes_count
        from posts
        left join postlikes on posts.post_id = postlikes.post_id
        group by posts.post_id
    )

    select
        sites.*,
        (ARRAY_AGG(prep_1.img_url order by prep_1.likes_count desc))[
            1
        ] as site_preview_url,
        (ARRAY_AGG(prep_1.post_id order by prep_1.likes_count desc))[
            1
        ] as post_id
    from sites left join prep_1 on sites.site_id = prep_1.site_id
    group by sites.site_id
) as prep_2 left join prep_3
    on prep_2.site_id = prep_3.site_id  `;

exports.accessSites = () => {
  return db.query(partialSiteQuery).then(({ rows }) => {
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
          WHERE prep_2.site_id = %L
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
