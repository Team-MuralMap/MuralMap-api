const db = require("../connection");
const fs = require("fs/promises");
//const format = require("pg-format");

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
