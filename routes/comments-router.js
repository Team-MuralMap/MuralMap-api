const {
  getCommentByCommentId,
  patchCommentByCommentId,
  deleteCommentByCommentId,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();
module.exports = commentsRouter;

commentsRouter.get("/:comment_id", getCommentByCommentId);
commentsRouter.patch("/:comment_id", patchCommentByCommentId);
commentsRouter.delete("/:comment_id", deleteCommentByCommentId);
