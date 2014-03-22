'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
/**
 * Thing Schema
 */
var PathSchema = new Schema({
  path_id: Number,
  pos_x: Number,
  pos_y: Number 
});

mongoose.model('Path', PathSchema);
