var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
var temp = [];
router.get("/", function(req, res, next) {
  res.render("shipment", { title: "出货", inputid: 0 });
});
router.post("/", function(req, res, next) {
  //console.log(req.body);
  if (req.body.hiddenId != temp.length) {
    res.location("back");
    res.render("shipment", { temps: temp, inputid: temp.length });
  } else {
    let search =
      "insert into login.feng_out (company,ftype,number,price,purchasetime) values (?,?,?,?,?)";
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
          res.render("shipment", {
            temps: temp,
            inputid: temp.length
          });
        } else {
        }
      });
    }
  }
});
//console.log(req.body);

module.exports = router;
