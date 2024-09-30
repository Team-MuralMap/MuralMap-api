const { accessEndpoints, accessUsers } = require("../models/api.models");

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
