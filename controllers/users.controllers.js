const {
  accessUsers,
  accessUser,
  removeUser,
  insertUser,
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
