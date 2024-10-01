const {
  getCommentByCommentId,
  deleteCommentByCommentId,
} = require("../controllers/comments.controllers");

const commentsRouter = require("express").Router();
module.exports = commentsRouter;

commentsRouter.get("/:comment_id", getCommentByCommentId);
commentsRouter.delete("/:comment_id", deleteCommentByCommentId);
