'use strict';

var mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  Path = mongoose.model('Path');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function(err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

exports.getPaths = function(req, res) {
  return Path.find(function(err, paths) {
    if (!err) {
      return res.json(paths);
    } else {
      return res.send(err);
    }
  });
};