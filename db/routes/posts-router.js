const { getCommentsByPostId } = require("../controllers/comments.controllers");
const {
  getPosts,
  getPostByPostId,
} = require("../controllers/posts.controllers");

const postsRouter = require("express").Router();
module.exports = postsRouter;

postsRouter.get("/", getPosts);
postsRouter.get("/:post_id", getPostByPostId);
postsRouter.get("/:post_id/comments", getCommentsByPostId);
// app.post("/api/posts", postPost)
// app.post("/api/posts/:post_id/comments", postCommentByPostId)
