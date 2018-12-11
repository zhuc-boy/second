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
router.use("/logout", function(req, res, next) {
  req.session.destroy;
  res.redirect("/");
});
module.exports = router;
