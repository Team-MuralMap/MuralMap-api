const { accessPosts, accessPost } = require("../models/posts.models");

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
