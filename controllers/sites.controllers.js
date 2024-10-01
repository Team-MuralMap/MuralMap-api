const { accessSites, accessSite, insertSite } = require("../models/sites.models");

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
}
