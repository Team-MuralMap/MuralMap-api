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
  insertPostlikeByUserAndPost,
  insertCommentlikeByUserAndComment,
  removePostlikeByUserAndPost,
  removeCommentlikeByUserAndComment,
  accessVisitsByUser,
  accessVisitByUserAndPost,
  insertVisitByUserAndPost,
  removeVisitByUserAndPost,
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

exports.getVisitsByUserId = (request, response, next) => {
  const { params } = request;
  accessVisitsByUser(params.user_id)
    .then((visitsData) => {
      response.status(200).send({ visits: visitsData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getVisitByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  accessVisitByUserAndPost(params.user_id, params.post_id)
    .then((visitData) => {
      response.status(200).send({ visit: visitData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postPostlikeByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  insertPostlikeByUserAndPost(params.user_id, params.post_id)
    .then((likeData) => {
      response.status(201).send({ like: likeData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postCommentlikeByUserIdAndCommentId = (request, response, next) => {
  const { params } = request;
  insertCommentlikeByUserAndComment(params.user_id, params.comment_id)
    .then((likeData) => {
      response.status(201).send({ like: likeData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postVisitByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  insertVisitByUserAndPost(params.user_id, params.post_id)
    .then((visitData) => {
      response.status(201).send({ visit: visitData });
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

exports.deletePostlikeByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  removePostlikeByUserAndPost(params.user_id, params.post_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteCommentlikeByUserIdAndCommentId = (request, response, next) => {
  const { params } = request;
  removeCommentlikeByUserAndComment(params.user_id, params.comment_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};

exports.deleteVisitByUserIdAndPostId = (request, response, next) => {
  const { params } = request;
  removeVisitByUserAndPost(params.user_id, params.post_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
