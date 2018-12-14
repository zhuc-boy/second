var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
var temp = [];
router.get("/", function(req, res, next) {
  res.render("store", { title: "仓库", inputid: 0 });
});
router.post("/", function(req, res, next) {
  //console.log(req.body);
  if (req.body.hiddenId != temp.length) {
    res.location("back");
    res.render("store", { temps: temp, inputid: temp.length });
  } else {
    let search =
      "insert into login.feng_in (company,ftype,number,price,purchasetime) values (?,?,?,?,?)";
    let search1 = "select * from login.feng_type where typename=?";
    let search2 = "insert into login.feng_type (typename) values (?)";
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
          res.location("back");
          temp.push(req.body);
          res.render("store", { temps: temp, inputid: temp.length });
        } else {
        }
      });
      db.query(search1, [req.body.type], (result, field) => {
        if (result.length == 0) {
          db.query(search2, [req.body.type], (result1, field1) => {
            if (result1.length != 0) {
              res.render("error", { message: "录入错误" });
            }
          });
        }
      });
    }
  }
});
//console.log(req.body);

module.exports = router;
