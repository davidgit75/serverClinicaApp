var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  identification: String,
  names: String,
  lastnames: String,
  email: String,
  password: String,
  age: String,
  civil_state: String,
  sex: String,
  occupation: String,
  phone: String,
});

module.exports = mongoose.model('user', Schema, 'user');