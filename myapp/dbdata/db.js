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

//set password for 'root'@'localhost'=old_password('zc1234');  可能需要输入一下
//1、use mysql；

//2、ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '新密码';

//3、FLUSH PRIVILEGES;

//4、SELECT * FROM product WHERE ID > =(select id from product limit 866613, 1) limit 20优化查询的方法
