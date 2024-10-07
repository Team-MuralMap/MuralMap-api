const db = require("../connection");
const format = require("pg-format");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.checkIfNum = (num) => {
  if (isNaN(Number(num)) || Number(num) > 2147483646 || Number(num) < 0) {
    return false;
  }
  return true;
};

exports.checkExists = (table, column, value) => {
  let queryStr = format(
    "SELECT * FROM %I WHERE %I = %L;",
    table,
    column,
    value
  );

  return db.query(queryStr).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    }
    return true;
  });
};

exports.coordinatesToNumbers = ({
  latitude: latitudeString,
  longitude: longitudeString,
  ...rest
}) => {
  const latitude = latitudeString ? Number(latitudeString) : undefined;
  const longitude = longitudeString ? Number(longitudeString) : undefined;
  return { latitude, longitude, ...rest };
};

exports.checkOrder = (order) => {
  if (order) {
    if (order.toLowerCase() === "asc") return "ASC";
    if (order.toLowerCase() === "desc") return "DESC";
    return Promise.reject({ status: 400, msg: "Bad Request" });
  }
  return "";
};
