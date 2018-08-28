let express = require('express');
let user = require('../controls/user');
let part = require('../controls/part');
let action = require('../controls/action');

let router = express.Router();

// 首页
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Qimi' });
});

// 用户
router.post('/api/user/queryUserList', user.queryUserList); // 查询用户列表
router.post('/api/user/queryUserInfo', user.queryUserInfo); // 查询用户详情

// 部位
router.post('/api/part/queryPartList', part.queryPartList); // 查询部位列表
router.post('/api/part/queryPartInfo', part.queryPartInfo); // 查询部位详情
router.post('/api/part/addPart', part.addPart); // 新增部位
router.post('/api/part/updatePart', part.updatePart); // 更新部位
router.post('/api/part/deletePart', part.deletePart); // 删除部位

// 动作
router.post('/api/action/queryActionList', action.queryActionList); // 查询动作列表
router.post('/api/action/queryActionInfo', action.queryActionInfo); // 查询动作详情
router.post('/api/action/addAction', action.addAction); // 新增动作
router.post('/api/action/updateAction', action.updateAction); // 更新动作
router.post('/api/action/deleteAction', action.deleteAction); // 删除动作

module.exports = router;