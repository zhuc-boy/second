var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
var uniq = require("../dbdata/uniq");
router.get("/", function(req, res, next) {
  let fengtype = [];
  db.query("select * from login.feng_in", [], (result, fields) => {
    for (let i = 0; i < result.length; i++) {}
  });
  res.render("search", { title: "查询" });
});
router.post("/", function(req, res, next) {
  //console.log(req.body);
  let search1 = req.body.input
    ? "select * from login.feng_in where ftype=?"
    : "select * from login.feng_in";
  let search2 = req.body.input
    ? "select * from login.feng_out where ftype=?"
    : "select * from login.feng_out";
  let dataarr = [];
  /*let num = 0,
    unit_price = 0,
    total_price = 0;*/
  let params = [req.body.input ? req.body.input : ""];
  db.query(search1, params, (result, fields) => {
    console.log(result);
    if (result.length != 0) {
      if (req.body.input) {
      }
    } else {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write("查询没结果");
    }
  });
});
module.exports = router;
