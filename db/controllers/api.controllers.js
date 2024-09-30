const {
  accessEndpoints,
  accessUsers,
  accessUser,
  accessSites,
  accessSite,
  accessPosts,
  accessPost,
  accessCommentsByPostId,
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
