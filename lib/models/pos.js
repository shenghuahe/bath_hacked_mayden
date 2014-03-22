'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var PoiSchema = new Schema({
  type: String,
  name: String,
  pos_x: Number,
  pos_y: Number,
  details: String
});

mongoose.model('Poi', PoiSchema);
