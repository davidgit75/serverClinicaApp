var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  identification: String,
  names: String,
  lastnames: String,
  email: String,
  professionalId: String
});

module.exports = mongoose.model('medic', Schema, 'medic');