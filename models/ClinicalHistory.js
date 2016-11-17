var mongoose = require('mongoose');

var Schema = mongoose.Schema({
  "hid": Number,
  "type_query": {type: mongoose.Schema.ObjectId, ref: 'typequery'},
  "names": String,
  "lastnames": String,
  "age": Number,
  "birthday": Number,
  "civil_state": String,
  "sex": String,
  "occupation": String,
  "nationality": String,
  "phone": [String],
  "identification": String,
  "reason_to_query": String,
  "records": {
    "personal": {
      "description": String,
      "drunk": Boolean,
      "smoke": Boolean,
      "drugs": Boolean
    },
    "parental": {
      "fathers": String,
      "brothers_and_sisters": String
    },
    "pathological": {
      "sickness": [{"name": String, "description": String}],
      "surgeries": [String],
      "allergies": [String]
    }
  },
  "tests": [{"type": String, "description": String}],
  "conclusions": [String]
});

module.exports = mongoose.model('clinicalhistory', Schema, 'clinicalhistory');

