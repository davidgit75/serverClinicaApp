var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  name: String,
  identification: String
});

module.exports = mongoose.model('medicalcenter', Schema, 'medicalcenter');