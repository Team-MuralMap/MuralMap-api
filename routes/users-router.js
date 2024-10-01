const {
  getUsers,
  getUserByUserId,
  deleteUser,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();
module.exports = usersRouter;

usersRouter.get("/", getUsers);

usersRouter.route("/:user_id")
.get((request, response, next) => {
  getUserByUserId(request, response, next);
})
.delete((request, response, next) => {
  deleteUser(request, response, next);
});


