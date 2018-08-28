// 封装连接池
let mysql = require('mysql');
let db = require('../db');

// 创建连接池
let pool = mysql.createPool(db);

module.exports = {
  /*
   * 从连接池中取出连接
   * params：
   * sql：sql语句
   * cb：回调函数
   */ 
  coonPool(sql, cb) {
    pool.getConnection((err, connection) => {
      if(err) { 
        console.log('建立连接失败') 
      };

      // 建立连接成功，执行sql语句，err：查询失败提示；rows：查询成功后返回的数据
      connection.query(sql, (err, rows) => {
        if (err) throw err;

        cb(rows);

        // 释放连接
        connection.release();
      })
    })
  }
}

