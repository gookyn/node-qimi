let pool = require('./pool');
let successInfo = { code: 200, msg: '请求成功' };

module.exports = {
  // 查询动作列表
  queryActionList(req, res) {
    if (!req.body.partId) {
      res.json({ code: 400, msg: '部位id不能为空' });
      return false;
    }

    let partId = req.body.partId,
        sql = `SELECT * FROM table_action WHERE part_id=${partId}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { actionList: rows }});
    });
  },

  // 查询动作详情
  queryActionInfo(req, res) {
    if (!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    }

    let id = req.body.id,
        sql = `SELECT * FROM table_action WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { actionInfo: rows[0] }});
    });
  },

  // 新增动作
  addAction(req, res) {
    if (!req.body.partId) {
      res.json({ code: 400, msg: '部位id不能为空' });
      return false;
    } else if(!req.body.actionName) {
      res.json({ code: 400, msg: '动作名称不能为空'});
      return false;
    } else if(!req.body.actionType) {
      res.json({ code: 400, msg: '动作类型不能为空'});
      return false;
    }

    // TODO: 需要获取当前用户id
    let partId = req.body.partId,
        actionName = req.body.actionName,
        actionType = req.body.actionType,
        sql = `INSERT INTO table_action (action_name, action_type, part_id) VALUES ('${actionName}', ${actionType}, ${partId})`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: {} });
    });
  },

  // 更新动作
  updateAction(req, res) {
    if(!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    } else if(!req.body.actionName) {
      res.json({ code: 400, msg: '动作名称不能为空' });
      return false;
    } else if(!req.body.actionType) {
      res.json({ code: 400, msg: '动作类型不能为空' });
      return false;
    }
    
    let id = req.body.id,
        actionName = req.body.actionName,
        actionType = req.body.actionType;
        sql = `UPDATE table_action SET action_name='${actionName}', action_type=${actionType} WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: {} });
    })
  },

  // 删除动作
  deleteAction(req, res) {
    if(!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    }

    let id = req.body.id,
        sql = `DELETE FROM table_action WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: {} });
    })
  }
};