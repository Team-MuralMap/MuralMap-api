const {
  accessPosts,
  accessPost,
  removePostByPostId,
  insertPost,
  updatePostByPostId,
} = require("../models/posts.models");

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
exports.postPost = (request, response, next) => {
  const { body } = request;
  insertPost(body)
    .then((postedPost) => {
      response.status(201).send({ post: postedPost });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchPostByPostId = (request, response, next) => {
  const { body, params } = request;
  updatePostByPostId(body, params.post_id)
    .then((updatedPost) => {
      response.status(202).send({ post: updatedPost });
    })
    .catch((err) => {
      next(err);
    });
};

exports.deletePostByPostId = (request, response, next) => {
  const { params } = request;
  removePostByPostId(params.post_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
};
