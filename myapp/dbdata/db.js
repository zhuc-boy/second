var mysql = require("mysql");

var connect = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "zc1234",
  //database: "world",
  port: "3306"
});

function query(sql, callback) {
  connect.connect(function(err) {
    if (err) {
      console.log("数据库报错" + err);
      return;
    }
  });
  connect.query(sql, (err, result, field) => {
    if (err) throw err;
    //console.log(result);
    callback(result);
  });
  connect.end();
}
module.exports = query;
//set password for 'root'@'localhost'=old_password('zc1234');  可能需要输入一下
//1、use mysql；

//2、ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

//3、FLUSH PRIVILEGES;
