const express = require("express");
const app = express();
// const cors = require("cors");
const {
  getEndpoints,
  getUsers,
  getUserByUserId,
  getSites,
  getSiteBySiteId,
  getPosts,
  getPostByPostId,
  getCommentsByPostId,
} = require("./db/controllers/api.controllers");

//  app.use(cors());
app.use(express.json());
app.get("/api", getEndpoints);
app.get("/api/users", getUsers);
app.get("/api/users/:user_id", getUserByUserId);
app.get("/api/sites", getSites);
app.get("/api/sites/:site_id", getSiteBySiteId);
app.get("/api/posts", getPosts);
app.get("/api/posts/:post_id", getPostByPostId);
app.get("/api/posts/:post_id/comments", getCommentsByPostId);
// app.get("/api/comments/:comment_id", getCommentByCommentId)
// app.post("/api/users", postUser)
// app.post("/api/sites", postSite)
// app.post("/api/posts", postPost)
// app.post("/api/posts/:post_id/comments", postCommentByPostId)

app.use((err, request, response, next) => {
  response.status(err.status).send(err.msg);
});

module.exports = app;
