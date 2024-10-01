const format = require("pg-format");
const db = require("../db/connection");
const { checkIfNum, checkExists } = require("../db/utils/utils");

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
