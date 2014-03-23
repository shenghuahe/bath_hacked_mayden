'use strict';

var mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  Path = mongoose.model('Path');

var _ = require('underscore');

var parsePaths = function(paths) {
  var result = [];
  var nestedData = [];
  var previousPathId = -1;
  var tempArray = [];
  _.each(paths, function(value, key) {
    if (!_.isEmpty(tempArray) && value.path_id != previousPathId) {
      nestedData.push(tempArray);
      tempArray = [];
    }
    tempArray.push(value);
    previousPathId = value.path_id;
  });
  nestedData.push(tempArray);
  //assign name to each route
  var count = 1;
  _.each(nestedData, function (value, key) {
    result.push({ name: 'Route '+ count, coordinates: value })
    count ++;
  });
  return result;
};

var extractUniquePathIds = function(paths) {
  var uniqueIds = [];
  _.each(paths, function(value, key) {
    uniqueIds.push(value.path_id);
  });
  return _.uniq(uniqueIds);
}

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
      if (!err) {
        return res.json(parsePaths(paths));
      } else {
        return res.send(err);
      }
    })
};

exports.getFilteredPaths = function(req, res) {
  return Path.find()
    .where('pos_x').gt(req.params.x1).lt(req.params.xn)
    .where('pos_y').gt(req.params.y1).lt(req.params.yn)
    .sort('+path_id')
    .sort('+timestamp')
    .exec(function(err, paths) {
      if (!err) {
        var uniquePathIds = extractUniquePathIds(paths);
        Path.find()
          .where('path_id')
          . in (uniquePathIds)
          .exec(function(err, paths) {
            if (!err) {
              return res.json(parsePaths(paths));
            } else {
              return res.send(err);
            }
          });

      } else {
        return res.send(err);
      }
    })
};