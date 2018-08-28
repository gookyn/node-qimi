let pool = require('./pool');
let successInfo = { code: 200, msg: '请求成功' };

module.exports = {
  // 查询部位列表
  queryPartList(req, res) {
    let sql = `SELECT * FROM table_part`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { partList: rows }});
    });
  },

  // 查询部位详情
  queryPartInfo(req, res) {
    if (!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    }

    let id = req.body.id;
    let sql = `SELECT * FROM table_part WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { partInfo: rows[0] }});
    });
  },

  // 新增部位
  addPart(req, res) {
    if(!req.body.partName) {
      res.json({ code: 400, msg: '部位名称不能为空'});
      return false;
    }

    // TODO: 需要获取当前用户id
    let partName = req.body.partName,
        sql = `INSERT INTO table_part (part_name) VALUES ('${partName}')`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: { id: rows.insertId }});
    });
  },

  // 更新部位
  updatePart(req, res) {
    if(!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    } else if(!req.body.partName) {
      res.json({ code: 400, msg: '部位名称不能为空' });
      return false;
    }

    let id = req.body.id,
        partName = req.body.partName;
        sql = `UPDATE table_part SET part_name='${partName}' WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: {} });
    })
  },

  // 删除部位
  deletePart(req, res) {
    if(!req.body.id) {
      res.json({ code: 400, msg: 'id不能为空' });
      return false;
    }

    let id = req.body.id,
        sql = `DELETE FROM table_part WHERE id=${id}`;
    pool.coonPool(sql, rows => {
      res.json({ ...successInfo, data: {} });
    })
  }
};