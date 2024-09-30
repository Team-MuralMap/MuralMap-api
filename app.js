const express = require("express");
const app = express();
// const cors = require("cors");

const apiRouter = require("./db/routes/api-router");

//  app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, request, response, next) => {
  response.status(err.status).send(err.msg);
});

module.exports = app;
