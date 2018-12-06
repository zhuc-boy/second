var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.render("login", { title: "登陆" });
});

router.post("/", function(req, res, next) {
  //console.log(req.body.accout,req.body.pwd);

  res.cookie("username", req.body.accout, {
    expires: new Date(Date.now() + 900000),
    httpOnly: true
  });
  res.redirect("/");
  //res.render("home", { admin: req.body.accout });
});

module.exports = router;
