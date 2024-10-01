const { response, request } = require("../app");
const {
  getSites,
  getSiteBySiteId,
  postSite,
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

sitesRouter.get("/:site_id", getSiteBySiteId);

module.exports = sitesRouter;
