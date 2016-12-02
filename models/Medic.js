var mongoose = require('mongoose');
var medicalCenter = require('./MedicalCenter');

var Schema = mongoose.Schema({
  identification: String,
  names: String,
  lastnames: String,
  email: String,
  password: String,
  professionalId: String,
  age: String,
  civil_state: String,
  sex: String,
  occupation: String,
  phone: String,
  medicalcenter: {type: mongoose.Schema.ObjectId, ref: "medicalcenter"},
});

module.exports = mongoose.model('medic', Schema, 'medic');