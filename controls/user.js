let pool = require('./pool');
let successInfo = { code: 200, msg: '请求成功' };

module.exports = {
  // 查询用户列表
  queryUserList(req, res) {
    let sql = 'SELECT * FROM table_user';
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { userList: rows }});
    });
  },

  // 查询用户详情
  queryUserInfo(req, res) {
    if (!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    }

    let id = req.body.id;
    let sql = `SELECT * FROM table_user WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { userInfo: rows[0] }});
    });
  }
};