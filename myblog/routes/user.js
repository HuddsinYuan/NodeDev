/* GET users listing. */
var User = require('../Model/user.js');
var Post = require('../Model/post.js');

exports.list = function (req, res, next) {
    res.send('respond with a resource');
};

exports.single = function (req, res) {
    User.get(req.params.username, function (err, user) {
        if(!user) {
            req.flash('error', '用户不存在');
            return res.redirect('/');
        }

        Post.get(user.name, function (err, posts) {
            if(err) {
                req.flash('error', err);
                return res.redirect('/');
            }

            res.render('user', { title: user.name, posts: posts});
        });
    });
};