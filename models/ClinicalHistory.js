var mongoose = require('mongoose');
var User = require("./User");
var Medic = require("./Medic");

var Schema = mongoose.Schema({
  "patient": {type: mongoose.Schema.ObjectId, ref:'user'},
  "medic": {type: mongoose.Schema.ObjectId, ref:'medic'},
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

