var express = require("express");
var router = express.Router();
var query = require("../dbdata/db");
router.get("/", function(req, res, next) {
  //console.log(req.session);
  if (req.session.username) {
    res.render("home", { title: "主页", admin: req.session.username });
    //res.render("list");
  } else {
    res.render("home", { title: "主页" });
  }
});
router.get("/logout", function(req, res, next) {
  req.session.destroy(function(err) {
    if (err) next(err);
    res.redirect("/");
  });
});
module.exports = router;
