const { response, request } = require("../app");
const {
  getSites,
  getSiteBySiteId,
  postSite,
  deleteSiteBySiteId,
} = require("../controllers/sites.controllers");

const sitesRouter = require("express").Router();

sitesRouter
  .route("/")
  .get((request, response, next) => {
    getSites(request, response, next);
  })
  .post((request, response, next) => {
    postSite(request, response, next);
  });

sitesRouter
  .route("/:site_id")
  .get((request, response, next) => {
    getSiteBySiteId(request, response, next);
  })
  .delete((request, response, next) => {
    deleteSiteBySiteId(request, response, next);
  });

module.exports = sitesRouter;
