var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
router.get("/", function(req, res, next) {
  res.render("login", { title: "登陆" });
});

router.post("/", function(req, res, next) {
  if (req.body.accout && req.body.pwd) {
    let search = "select * from login.login where accout=? and pwd=?"; //where 'accout'=? and 'pwd'=?
    let params = [req.body.accout, req.body.pwd];
    db.query(search, params, (result, fields) => {
      //req.body.accout, req.body.pwd
      console.log(result);
      if (result.length != 0) {
        res.cookie("username", req.body.accout, {
          expires: new Date(Date.now() + 900000),
          httpOnly: true
        });
        res.redirect("/");
      } else {
        res.writeHead(200, { "Content-type": "text/html" });
        res.write("<script charset='GBK' type='text/javascript'>");
        res.write("window.alert('wrong accout or password');");
        res.write("window.location.href='/login'");
        res.end("</script>");
      }
    });
  } else {
    res.writeHead(200, { "Content-type": "text/html" });
    res.write("<script charset='GBK' type='text/javascript'>");
    res.write("window.alert('you should input accout and password');");
    res.write("window.location.href='/login'");
    res.end("</script>");
  }
  //res.render("home", { admin: req.body.accout });
});

module.exports = router;
