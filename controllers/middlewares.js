module.exports.checkUser = function(req, res, next){
  console.log("middlware CheckUser");
  next();
};
