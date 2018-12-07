var mysql = require("mysql");
var dbconfig = require(".//config");

module.exports = {
  query: function(sql, params, callback) {
    var connection = mysql.createConnection(dbconfig);
    connection.connect(err => {
      if (err) {
        console.log("数据库连接错误");
        throw err;
      }
      connection.query(sql, params, (err, result, field) => {
        if (err) {
          console.log("数据操作失败");
          throw err;
        }
        callback && callback(result, field);
        connection.end(err => {
          if (err) {
            console.log("数据库关闭失败");
            throw err;
          }
        });
      });
    });
  }
};
/*var connect = mysql.createConnection({});
connect.connect(function(err) {
  if (err) {
    console.log("数据库报错" + err);
    return;
  }
});
function query(sql, callback) {
  connect.query(sql, (err, result, field) => {
    if (err) throw err;
    //console.log(result);
    callback(result);
  });
  //connect.end();
}
module.exports = query;*/
//set password for 'root'@'localhost'=old_password('zc1234');  可能需要输入一下
//1、use mysql；

//2、ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

//3、FLUSH PRIVILEGES;
