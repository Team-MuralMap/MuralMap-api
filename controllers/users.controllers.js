const { request } = require("express");
const {
  accessUsers,
  accessUser,
  removeUser,
  insertUser,
  accessPostlikesByUser,
  accessPostlikeByUserAndPost,
  accessCommentlikesByUser,
  accessCommentlikeByUserAndComment,
} = require("../models/users.models");

exports.getUsers = (request, response, next) => {
  accessUsers()
    .then((usersData) => {
      response.status(200).send({ users: usersData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getUserByUserId = (request, response, next) => {
  const { params } = request;
  accessUser(params.user_id)
    .then((userData) => {
      response.status(200).send({ user: userData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPostlikesByUserId = (request, response, next) => {
  const { params } = request;
  accessPostlikesByUser(params.user_id)
    .then((likesData) => {
      response.status(200).send({ likes: likesData });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getPostlikeByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  accessPostlikeByUserAndPost(params.user_id, params.post_id)
    .then((likeData) => {
      response.status(200).send({ like: likeData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getCommentlikesByUserId = (request, response, next) => {
  const { params } = request;
  accessCommentlikesByUser(params.user_id)
    .then((likesData) => {
      response.status(200).send({ likes: likesData });
    })
    .catch((err) => {
      next(err);
    });
};
exports.getCommentlikeByUserIdAndCommentId = (request, response, next) => {
  const { params } = request;
  accessCommentlikeByUserAndComment(params.user_id, params.comment_id)
    .then((likeData) => {
      response.status(200).send({ like: likeData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteUser = (request, response, next) => {
  const { user_id } = request.params;
  removeUser(user_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.postUser = (request, response, next) => {
  const newUser = request.body;

  insertUser(newUser)
    .then((user) => {
      response.status(201).send({ user });
    })
    .catch((err) => {
      next(err);
    });
};
