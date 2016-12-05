var express = require('express');
var router = express.Router();
var utils = require("./dbUtils");

// Register new user
router.post("/app/user/new", utils.registerUser);

router.post("/app/user/login", utils.loginUser);

router.post("/app/medics", utils.getMedics);

router.post("/app/user/check", utils.checkUser);

router.post("/app/history/new", utils.createNewHistory);

router.post("/app/history/:identification", utils.getHistoryByPatient);

router.post("/app/profile/edit", utils.editProfile);

module.exports = router;