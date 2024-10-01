const { getCommentsByPostId } = require("../controllers/comments.controllers");
const {
  getPosts,
  getPostByPostId,
  deletePostByPostId,
  postPost,
} = require("../controllers/posts.controllers");

const postsRouter = require("express").Router();
module.exports = postsRouter;

postsRouter.get("/", getPosts);
postsRouter.get("/:post_id", getPostByPostId);
postsRouter.get("/:post_id/comments", getCommentsByPostId);
postsRouter.post("/", postPost);
// app.post("/api/posts/:post_id/comments", postCommentByPostId)
postsRouter.delete("/:post_id", deletePostByPostId);
