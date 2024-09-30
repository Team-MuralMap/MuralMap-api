const { getEndpoints } = require("../controllers/api.controllers");
const commentsRouter = require("./comments-router");
const postsRouter = require("./posts-router");
const sitesRouter = require("./sites-router");
const usersRouter = require("./users-router");

const apiRouter = require("express").Router();
module.exports = apiRouter;

apiRouter.all("/", getEndpoints);

apiRouter.use("/users", usersRouter);
apiRouter.use("/sites", sitesRouter);
apiRouter.use("/posts", postsRouter);
apiRouter.use("/comments", commentsRouter);
