const express = require("express");
const app = express();
// const cors = require("cors");

const apiRouter = require("./routes/api-router");

//  app.use(cors());
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, request, response, next) => {
  if(err.code === '23502') {
    response.status(400).send('Bad Request');
  } else {
    response.status(err.status).send(err.msg);
  }
});

module.exports = app;
