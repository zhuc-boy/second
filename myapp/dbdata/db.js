var mysql = require("mysql");

var pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "zc1234",
  database: "world",
  port: "3306"
});

function query(sql, callback) {
  pool.getConnection((err, connection) => {
    connection.query(sql, (err, rows) => {
      callback(err, rows);
      connection.release();
    });
  });
}
module.exports = query;
//set password for 'root'@'localhost'=old_password('123');  可能需要输入一下
