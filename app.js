const express = require("express");
const app = express();
// const cors = require("cors");
const { getEndpoints, getUsers } = require("./db/controllers/api.controllers");

//  app.use(cors());
app.use(express.json());
app.get("/api", getEndpoints);
app.get("/api/users", getUsers);

module.exports = app;
