const {
  getCommentsByPostId,
  postCommentByPostId,
} = require("../controllers/comments.controllers");
const {
  getPosts,
  getPostByPostId,
  deletePostByPostId,
  postPost,
  patchPostByPostId,
} = require("../controllers/posts.controllers");

const postsRouter = require("express").Router();
module.exports = postsRouter;

postsRouter.get("/", getPosts);
postsRouter.get("/:post_id", getPostByPostId);
postsRouter.get("/:post_id/comments", getCommentsByPostId);
postsRouter.post("/", postPost);
postsRouter.post("/:post_id/comments", postCommentByPostId);
postsRouter.patch("/:post_id", patchPostByPostId);
postsRouter.delete("/:post_id", deletePostByPostId);
