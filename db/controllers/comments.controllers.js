const {
  accessCommentsByPostId,
  accessCommentByCommentId,
  removeCommentByCommentId,
} = require("../models/comments.models");

exports.getCommentsByPostId = (request, response, next) => {
  const { params } = request;
  accessCommentsByPostId(params.post_id)
    .then((commentsData) => {
      response.status(200).send({ comments: commentsData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentByCommentId = (request, response, next) => {
  const { params } = request;
  accessCommentByCommentId(params.comment_id)
    .then((commentData) => {
      response.status(200).send({ comment: commentData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentByCommentId = (request, response, next) => {
  const { params } = request;
  removeCommentByCommentId(params.comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
