var state = "development";
var databases = {
  development: "mongodb://localhost/clinicapp",
  production: ""
};

module.exports = {
  database: databases[state]
};
