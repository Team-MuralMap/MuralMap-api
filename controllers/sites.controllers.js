const { request, response } = require("../app");
const { accessSites, accessSite, insertSite, removeSite } = require("../models/sites.models");

exports.getSites = (request, response, next) => {
  accessSites()
    .then((sitesData) => {
      response.status(200).send({ sites: sitesData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getSiteBySiteId = (request, response, next) => {
  const { params } = request;
  accessSite(params.site_id)
    .then((siteData) => {
      response.status(200).send({ site: siteData });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postSite = (request, response, next) => {
  const newSite = request.body;

  insertSite(newSite)
  .then((site) => {
    response.status(201).send({site});
  })
  .catch((err) => {
    next(err);
  });
};

exports.deleteSiteBySiteId = (request, response, next) => {
  const { site_id } = request.params;
  removeSite(site_id)
    .then(() => {
      response.status(204).send();
    })
    .catch((err) => {
      next(err);
    });
}
