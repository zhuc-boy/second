var express = require("express");
var router = express.Router();
var db = require("../dbdata/db");
router.get("/", function(req, res, next) {
  res.render("login", { title: "登陆" });
});

router.post("/", function(req, res, next) {
  //console.log(req.session);
  if (req.body.accout && req.body.pwd) {
    let search = "select * from login.login where accout=? and pwd=?"; //where 'accout'=? and 'pwd'=?
    let params = [req.body.accout, req.body.pwd];
    db.query(search, params, (result, fields) => {
      if (result.length != 0) {
        req.session.username = req.body.accout;
        res.redirect("/");
      } else {
        /*res.writeHead(200, { "Content-type": "text/html" });
        res.write("<script  type='text/javascript'>");
        res.write("window.alert('账号密码错误');");
        res.write("window.location.href='/login'");
        res.end("</script>");*/
        res.send(
          "<script>window.alert('账号密码错误');window.location.href='/login'</script>"
        );
      }
    });
  } else {
    /*res.writeHead(200, { "Content-type": "text/html" });
    res.write("<script  type='text/javascript'>");
    res.write("window.alert('请输入账号密码');");
    res.write("window.location.href='/login'");
    res.end("</script>");*/
    res.send(
      "<script>window.alert('请输入账号密码');window.location.href='/login'</script>"
    );
  }
  //res.render("home", { admin: req.body.accout });
});

module.exports = router;
