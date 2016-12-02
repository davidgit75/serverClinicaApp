var mongoose = require('mongoose');
var User = require("./User");
var Medic = require("./Medic");
var MedicalCenter = require("./MedicalCenter");

var Schema = mongoose.Schema({
  "patient": {type: mongoose.Schema.ObjectId, ref:'user'},
  "medic": {type: mongoose.Schema.ObjectId, ref:'medic'},
  "medicalcenter": {type: mongoose.Schema.ObjectId, ref:'medicalcenter'},
  "reason_to_query": String,
  "records": {
    "personal": {
      "drunk": Boolean,
      "smoke": Boolean,
      "drugs": Boolean
    },
    "parental": String,
    "pathological": {
      "sickness": String,
      "surgeries": String,
      "allergies": String
    }
  },
  "tests": String,
  "recommendations": String,
  "date": String
});

module.exports = mongoose.model('clinicalhistory', Schema, 'clinicalhistory');

