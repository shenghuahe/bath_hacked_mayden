'use strict';

var api = require('./controllers/api'),
    index = require('./controllers');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);

  app.get('/api/paths', api.getPaths);
  // /api/paths/[x1]/[y1]/[xn]/[yn]
  app.get('/api/paths/:x1/:y1/:xn/:yn', api.getFilteredPaths);
  // api to get poi
  app.get('/api/pois', api.getPois);
  // api to import GPX file
  app.get('/api/import-gpx', api.importGPX);

  // All undefined api routes should return a 404
  app.get('/api/*', function(req, res) {
    res.send(404);
  });
  
  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};