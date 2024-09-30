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

exports.getSiteBySiteId = (request, response, next) => {
  const { params } = request;
  accessSite(params.site_id)
    .then((siteData) => {
      response.status(200).send({ site: siteData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPosts = (request, response, next) => {
  accessPosts()
    .then((postsData) => {
      response.status(200).send({ posts: postsData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getPostByPostId = (request, response, next) => {
  const { params } = request;
  accessPost(params.post_id)
    .then((postData) => {
      response.status(200).send({ post: postData });
    })
    .catch((err) => {
      next(err);
    });
};

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
