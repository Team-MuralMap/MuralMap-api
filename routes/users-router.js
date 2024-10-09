const {
  getUsers,
  getUserByUserId,
  deleteUser,
  postUser,
  getPostlikesByUserId,
  getPostlikeByUserIdAndPostId,
  getCommentlikesByUserId,
  getCommentlikeByUserIdAndCommentId,
  postPostlikeByUserIdAndPostId,
  postCommentlikeByUserIdAndCommentId,
  deletePostlikeByUserIdAndPostId,
  deleteCommentlikeByUserIdAndCommentId,
  deleteVisitByUserIdAndPostId,
  postVisitByUserIdAndPostId,
  getVisitByUserIdAndPostId,
  getVisitsByUserId,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();
module.exports = usersRouter;

usersRouter
  .route("/")
  .get((request, response, next) => {
    getUsers(request, response, next);
  })
  .post((request, response, next) => {
    postUser(request, response, next);
  });

usersRouter
  .route("/:user_id")
  .get((request, response, next) => {
    getUserByUserId(request, response, next);
  })
  .delete((request, response, next) => {
    deleteUser(request, response, next);
  });

usersRouter.route("/:user_id/postlikes").get((request, response, next) => {
  getPostlikesByUserId(request, response, next);
});

usersRouter
  .route("/:user_id/postlikes/:post_id")
  .get((request, response, next) => {
    getPostlikeByUserIdAndPostId(request, response, next);
  })
  .post((request, response, next) => {
    postPostlikeByUserIdAndPostId(request, response, next);
  })
  .delete((request, response, next) => {
    deletePostlikeByUserIdAndPostId(request, response, next);
  });

usersRouter.route("/:user_id/commentlikes").get((request, response, next) => {
  getCommentlikesByUserId(request, response, next);
});

usersRouter
  .route("/:user_id/commentlikes/:comment_id")
  .get((request, response, next) => {
    getCommentlikeByUserIdAndCommentId(request, response, next);
  })
  .post((request, response, next) => {
    postCommentlikeByUserIdAndCommentId(request, response, next);
  })
  .delete((request, response, next) => {
    deleteCommentlikeByUserIdAndCommentId(request, response, next);
  });

usersRouter.route("/:user_id/visits").get((request, response, next) => {
  getVisitsByUserId(request, response, next);
});

usersRouter
  .route("/:user_id/visits/:post_id")
  .get((request, response, next) => {
    getVisitByUserIdAndPostId(request, response, next);
  })
  .post((request, response, next) => {
    postVisitByUserIdAndPostId(request, response, next);
  })
  .delete((request, response, next) => {
    deleteVisitByUserIdAndPostId(request, response, next);
  });
