let express = require('express'); // 加载express模块
let cookieParser = require('cookie-parser'); // 一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。
let path = require('path');
let router = require('./routes');
let createError = require('http-errors');

let app = express();

// 载入中间件
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 配置路由
app.use('/', router);

// 模板开始
app.set('views', path.join(__dirname, 'views')); //设置视图根目录
app.set('view engine', 'ejs'); //设置视图格式

// 错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
