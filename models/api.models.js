const db = require("../db/connection");
const { checkIfNum, checkExists } = require("../db/utils/utils");
const fs = require("fs/promises");
const format = require("pg-format");

exports.accessEndpoints = () => {
  return fs
    .readFile(`${__dirname}/../../endpoints.json`, "utf-8")
    .then((data) => {
      return JSON.parse(data);
    });
};
