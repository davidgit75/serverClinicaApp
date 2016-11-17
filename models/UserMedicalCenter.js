var mongoose = require('mongoose');
var MedicalCenter = require('./MedicalCenter');

var Schema = mongoose.Schema({
  medicalcenter: {type: mongoose.Schema.ObjectId, ref: "MedicalCenter"},
  names: String,
  lastnames: String,
  identification: Number
});

module.exports = mongoose.model('usermedicalcenter', Schema, 'usermedicalcenter');