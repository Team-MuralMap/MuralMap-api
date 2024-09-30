const {
  getSites,
  getSiteBySiteId,
} = require("../controllers/sites.controllers");

const sitesRouter = require("express").Router();
module.exports = sitesRouter;

sitesRouter.get("/", getSites);
sitesRouter.get("/:site_id", getSiteBySiteId);
// app.post("/api/sites", postSite)
