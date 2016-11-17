var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  identification: Number,
  names: String,
  lastnames: String,
  email: String,
  type: {type: String, enum: {values: ["patient", "medic"], message: "Tipo de usuario no válido"}}
});

module.exports = mongoose.model('user', Schema, 'user');