var express = require("express");
var router = express.Router();
var query = require("../dbdata/db");
router.get("/", function(req, res, next) {
  //console.log(req.session);
  if (req.cookies) {
    res.render("home", { title: "Express", admin: req.cookies.username });
  } else {
    res.render("home", { title: "Express" });
  }
  let que='SELECT * FROM world.city';
  query(que,(data)=>{
    console.log(data);
  });
});

module.exports = router;
