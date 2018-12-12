var express = require("express");
var router = express.Router();
var query = require("../dbdata/db");
router.get("/", function(req, res, next) {
  //console.log(req.session);
  if (req.session.username) {
    res.render("home", { title: "Express", admin: req.session.username });
  } else {
    res.render("home", { title: "Express" });
  }
});
router.get("/logout", function(req, res, next) {
  console.log("11111111111");
  req.session.destroy(function(err) {
    if (err) next(err);
    res.redirect("/");
  });
});
module.exports = router;
