var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var setting = require('./DBSetting');
var flash = require('connect-flash');
var expressLayouts = require("express-ejs-layouts");


var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(flash());
app.use(expressLayouts);

/*
    启动会话
    将数据存储在db中
    引用数据库
*/
app.use(session({
    secret: setting.cookieSecret,
    store: new MongoStore({
        db: setting.db
    })
}));
/*
    采用动态视图助手,每次加载三个数值
    user: 当前会话的用户
    error: 当前执行的所有操作里是否有错误,有的话error会带有一串字符串,否则为null
    success: 当前执行的所有操作里是否有成功,有的话success会带有一串字符串,否则为null
 */
app.use(function(req, res, next) {
    console.log("app.usr local");
    res.locals.user = req.session.user;
    //res.locals.post = req.session.post;
    var error = req.flash('error');
    res.locals.error = error.length ? error : null;
    var success = req.flash('success');
    res.locals.success = success.length ? success : null;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.post('/post', routes.post);
app.get('/reg', routes.reg);
app.post('/reg', routes.doReg);
app.get('/login', routes.login);
app.post('/login', routes.doLogin);
app.get('/logout', routes.logout);

app.get('/u', users.list);
app.get('/u/:username', users.single);

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});


//module.exports = app;
app.set('port', process.env.PORT || 3000);

http.createServer(app).listen(app.get('port'), function() {
    console.log("Express server listening on port " + app.get('port'));
});


module.exports=app