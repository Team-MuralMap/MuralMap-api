const {
  accessEndpoints,
  accessUsers,
  accessUser,
  accessSites,
} = require("../models/api.models");

exports.getEndpoints = (request, response, next) => {
  accessEndpoints()
    .then((endpointData) => {
      response.status(200).send({ endpoints: endpointData });
    })
    .catch((err) => {
      next(err);
    });
};

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

exports.getSites = (request, response, next) => {
  accessSites()
    .then((sitesData) => {
      response.status(200).send({ sites: sitesData });
    })
    .catch((err) => {
      next(err);
    });
};
