'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var PathSchema = new Schema({
  path_id: String,
  pos_x: Number,
  pos_y: Number,
  timestamp: Number
});

mongoose.model('Path', PathSchema);
