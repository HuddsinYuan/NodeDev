/* GET home page. */
var crypto = require('crypto');
var flash = require('connect-flash');
var User = require('../Model/user.js');
var Post = require('../Model/post.js');

exports.index = function (req, res) {
    Post.get(null, function (err, posts) {
        if(err) {
            posts = [];
        }
        res.render('index', {title: '首页', posts: posts});
    });
};

exports.user = function (req, res) {

};

exports.post = function (req, res) {
    /*
        利用了会话的保存的功能就可以得到当前的用户
     */
    var currentUser = req.session.user;
    /*
        利用当前get的数据来创建一个新的post
     */
    var post = new Post(currentUser.name, req.body.post);
    /*
        虽然callback会传回两个参数,但是此处只需要保存微博,所以不需要返回post参数.
     */
    post.save(function (err) {
        if(err) {
            req.flash('errpr', err);
            return res.redirect('/');
        }
        req.flash('success', '发表成功');
        res.redirect('/u/' + currentUser.name);
    });
};

exports.reg = function (req, res) {
    res.render('reg', {title: '注册'});
};

exports.doReg = function (req, res) {
    if (req.body['password-repeat'] != req.body['password']) {
        req.flash('error', '两次密码不一样');
        return res.redirect('/reg');
    }

    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    /*
        以输入的账号和密码来新建一个用户
        此处的用户对应的是Model中的user模型
        name: 用户名
        password: 加密了的密码
     */
    var newUser = new User({
        name: req.body.username,
        password: password
    });
    /*
        采用User的get方法.
        get方法在user.js中.

        查询是否newUser.name的数据在数据库中,执行完毕后调用回调
     */

    User.get(newUser.name, function (err, user) {
        /*
            user返回不会空则说明数据库中有这组数据
         */
        if (user) {
            err = 'Username already exists.';
        }

        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        /*
            执行到此处则是数据库中无此组数据,并且无错误,于是就新建这一组数据存入数据库中.
         */
        newUser.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }

            /*
                保存当前用户的会话,显示注册成功,并且跳转到首页
             */

            /*
                以此来判断当前用户是否登录
             */
            req.session.user = newUser;
            req.flash('success', "注册成功");
            res.redirect('/');
        });
    });
};

exports.login = function (req, res) {
    res.render('login', { title: "用户登录"});
};

/*
    在 /login 界面载入后直接设置页面为 method = "post"
    所以在唯一的输入源button的地方,按下则触发post请求,进入这个函数.
 */
exports.doLogin = function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        /*
            如果不存在这个用户,则报错,从新渲染登录的页面
         */
        if (!user) {
            req.flash('error', '用户不合法');
            return res.redirect('/login');
        }

        /*
            如果密码与数据库中对应用户的密码 不符合,则也报错
         */

        if (user.password != password) {
            req.flash('error', '密码错误');
            return res.redirect('/login');
        }

        /*
            如果正确登录,则将当前会话的用户设置为登录的用户
         */
        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    })

};

exports.logout = function (req, res) {
    /*
        当前会话无用户
     */
    req.session.user = null;
    req.flash('success', "登出成功");
    res.redirect('/');
};
