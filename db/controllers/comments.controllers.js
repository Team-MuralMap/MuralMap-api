const { accessCommentsByPostId } = require("../models/comments.models");

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
