var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
var temp = [];
router.get("/", function(req, res, next) {
  res.render("store", { title: "仓库" });
});
router.post("/", function(req, res, next) {
  let search =
    "insert into login.feng_in (company,ftype,number,price,purchasetime) values (?,?,?,?,?)";
  let params = [
    req.body.company,
    req.body.type,
    req.body.number,
    req.body.price,
    req.body.time
  ];
  if (
    !req.body.company ||
    !req.body.type ||
    !req.body.number ||
    !req.body.price ||
    !req.body.time
  ) {
    return;
  } else {
    db.query(search, params, function(result, field) {
      if (result.serverStatus == 2) {
        //res.redirect("/store");
        temp.push(req.body);
        res.render("store", { temps: temp });
      } else {
      }
    });
  }
});
//console.log(req.body);

module.exports = router;
