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
    var currentUser = req.session.user;
    var post = new Post(currentUser.name, req.body.post);
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

    var newUser = new User({
        name: req.body.username,
        password: password
    });

    User.get(newUser.name, function (err, user) {
        if (user) {
            err = 'Username already exists.';
        }

        if (err) {
            req.flash('error', err);
            return res.redirect('/reg');
        }

        newUser.save(function (err) {
            if (err) {
                req.flash('error', err);
                return res.redirect('/reg');
            }

            req.session.user = newUser;
            req.flash('success', "注册成功");
            res.redirect('/');
        });
    });
};

exports.login = function (req, res) {
    res.render('login', { title: "用户登录"});
};

exports.doLogin = function (req, res) {
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');

    User.get(req.body.username, function (err, user) {
        if (!user) {
            req.flash('error', '用户不合法');
            return res.redirect('/login');
        }

        if (user.password != password) {
            req.flash('error', '密码错误');
            return res.redirect('/login');
        }

        req.session.user = user;
        req.flash('success', '登录成功');
        res.redirect('/');
    })

};

exports.logout = function (req, res) {
    req.session.user = null;
    req.flash('success', "登出成功");
    res.redirect('/');
};
