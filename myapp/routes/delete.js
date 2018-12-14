var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
router.get("/", function(req, res, netx) {
  res.render("delete", { title: "删除记录" });
});
router.get("/in", function(req, res, next) {
  let search1 = "select * from login.feng_in order by id DESC";
  let in_result = [];
  db.query(search1, [], (result, filed) => {
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let time = JSON.stringify(result[i].purchasetime);
        time = time.substring(1, time.indexOf("T"));
        in_result.push({
          company: result[i].company,
          number: result[i].number,
          price: result[i].price,
          time: time,
          id: result[i].id
        });
      }
      //console.log(in_result);
      //res.location("back");
      res.render("delete", { title: "删除记录", in_result: in_result });
    } else {
      res.render("delete", {
        title: "删除记录"
      });
    }
  });
});
router.get("/in/*", function(req, res, next) {
  //console.log(req.url);
  let num = req.url.split("/")[2];
  let search1 = "delete  from login.feng_in where id=?";
  db.query(search1, [num], (result, filed) => {
    console.log(result);
    if (result) {
      res.redirect("/delete/in");
    } else {
    }
  });
});
router.get("/out", function(req, res, next) {
  let search2 = "select * from login.feng_out order by id DESC";
  let out_result = [];
  db.query(search2, [], (result, filed) => {
    if (result.length > 0) {
      for (let i = 0; i < result.length; i++) {
        let time = JSON.stringify(result[i].shippingtime);
        time = time.substring(1, time.indexOf("T"));
        out_result.push({
          company: result[i].company,
          number: result[i].number,
          price: result[i].price,
          time: time,
          id: result[i].id
        });
      }
      //console.log(in_result);
      //res.location("back");
      res.render("delete", {
        title: "删除记录",
        out_result: out_result
      });
    } else {
      res.render("delete", { title: "删除记录" });
    }
  });
});
router.get("/out/*", function(req, res, next) {
  //console.log(req.url);
  let num = req.url.split("/")[2];
  let search1 = "delete  from login.feng_out where id=?";
  db.query(search1, [num], (result, filed) => {
    console.log(result);
    if (result) {
      res.redirect("/delete/out");
    } else {
    }
  });
});
module.exports = router;
