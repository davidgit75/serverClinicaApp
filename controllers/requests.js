var express = require('express');
var router = express.Router();
var utils = require("./dbUtils");

// Register new user
router.post("/app/user/new", function(req, res){
  console.log(req.body);
  utils.isUserInApp(req.body, function(out){
    res.send(out);
  });
});


module.exports = router;