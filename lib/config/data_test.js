'use strict';

var mongoose = require('mongoose'),
  Thing = mongoose.model('Thing'),
  Path = mongoose.model('Path');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name: 'HTML5 Boilerplatexxx',
    info: 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name: 'AngularJS',
    info: 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name: 'Karma',
    info: 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name: 'Express',
    info: 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name: 'MongoDB + Mongoose',
    info: 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
    console.log('finished populating things');
  });
});
Path.find({}).remove(function() {
  Path.create({
    path_id: 1,
    pos_x: 100,
    pos_y: 100,
    timestamp: 1395507690
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 101,
    timestamp: 1395507691
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 102,
    timestamp: 1395507692
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 103,
    timestamp: 1395507693
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 104,
    timestamp: 1395507694
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 105,
    timestamp: 1395507695
  }, {
    path_id: 1,
    pos_x: 100,
    pos_y: 106,
    timestamp: 1395507696
  }, {
    path_id: 2,
    pos_x: 1000,
    pos_y: 1001,
    timestamp: 1395507690
  }, {
    path_id: 2,
    pos_x: 1000,
    pos_y: 1002,
    timestamp: 1395507691
  }, {
    path_id: 2,
    pos_x: 1000,
    pos_y: 1004,
    timestamp: 1395507692
  }, {
    path_id: 2,
    pos_x: 1000,
    pos_y: 1005,
    timestamp: 1395507693
  }, {
    path_id: 2,
    pos_x: 1000,
    pos_y: 1006,
    timestamp: 1395507694
  }, function() {
    console.log('finished populating paths');
  });
});