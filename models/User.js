var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  identification: String,
  names: String,
  lastnames: String,
  email: String,
  password: String,
  reviewer: {type: mongoose.Schema.ObjectId, ref:"medic"}
});

module.exports = mongoose.model('user', Schema, 'user');