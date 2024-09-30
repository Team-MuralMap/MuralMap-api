const {
  getUsers,
  getUserByUserId,
} = require("../controllers/users.controllers");

const usersRouter = require("express").Router();
module.exports = usersRouter;

usersRouter.get("/", getUsers);
usersRouter.get("/:user_id", getUserByUserId);
// app.post("/api/users", postUser)
