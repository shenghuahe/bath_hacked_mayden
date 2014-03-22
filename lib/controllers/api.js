'use strict';

var mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  Path = mongoose.model('Path');

var _ = require('underscore');

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
  return Path.find()
  .sort('+path_id')
  .sort('+timestamp')
  .exec(function(err, paths) {
    var nestedData = [];
    var previousPathId = -1;
    var tempArray = [];
    _.each(paths, function (value, key) {
      if (!_.isEmpty(tempArray) && value.path_id != previousPathId) {
        nestedData.push(tempArray);
        tempArray = [];
      }
      tempArray.push(value);
      previousPathId = value.path_id;
    });
    nestedData.push(tempArray);
    if (!err) {
      return res.json(nestedData);
    } else {
      return res.send(err);
    }
  })
};