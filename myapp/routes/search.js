var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
var uniq = require("../dbdata/uniq");
let fengtype = [];
router.get("/", function(req, res, next) {
  db.query("select typename from login.feng_type", [], (result, fields) => {
    result.map(function(item) {
      fengtype.push(item.typename);
    });
    res.render("search", { title: "查询", fengtype: fengtype });
  });
});
router.post("/", function(req, res, next) {
  let search1 = "select * from login.feng_in where ftype=?";
  let search2 = "select * from login.feng_out where ftype=?";
  let dataarr = [];
  let num = 0,
    unit_price = 0,
    total_price = 0;
  let params = [req.body.ch1];
  let in_result = [],
    out_result = [];
  db.query(search1, params, (result, fields) => {
    if (result.length != 0) {
      for (let i = 0; i < result.length; i++) {
        let time = JSON.stringify(result[i].purchasetime);
        time = time.substring(1, time.indexOf("T"));
        in_result.push({
          company: result[i].company,
          number: result[i].number,
          price: result[i].price,
          purchasetime: time
        });
        num += result[i].number;
        total_price += result[i].number * result[i].price;
      }
    } else {
      res.writeHead(200, { "Content-type": "text/html" });
      res.write("查询没结果");
    }
    //console.log(in_result);
    db.query(search2, params, (result, fields) => {
      if (result.length != 0) {
        for (let i = 0; i < result.length; i++) {
          let time = JSON.stringify(result[i].shippingtime);
          time = time.substring(1, time.indexOf("T"));
          out_result.push({
            company: result[i].company,
            number: result[i].number,
            price: result[i].price,
            purchasetime: time
          });
          num -= result[i].number;
          total_price -= result[i].number * result[i].price;
        }
      } else {
      }
      //console.log(out_result);
      unit_price = total_price / num;
      res.render("search", {
        out_result: out_result,
        in_result: in_result,
        num: num,
        total_price: total_price,
        unit_price: unit_price,
        title: "查询",
        fengtype: fengtype
      });
    });
  });
});
module.exports = router;
