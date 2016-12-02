var state = "development";
var databases = {
  development: "mongodb://localhost/clinicapp",
  production: "mongodb://userdb:*userdb*@ds119618.mlab.com:19618/clinicapp"
};

module.exports = {
  database: databases[state]
};
