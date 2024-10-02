const {
  getUsers,
  getUserByUserId,
  deleteUser,
  postUser,
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
