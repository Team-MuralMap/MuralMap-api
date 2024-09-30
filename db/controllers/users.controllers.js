const { accessUsers, accessUser } = require("../models/users.models");

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
