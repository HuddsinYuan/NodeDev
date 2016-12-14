/**
 * Created by Jonassen on 16/2/17.
 */
var mongodb = require('./db');

/*
    construct function 
    
    User consist two values:
        name ---- account name
        password ---- account password
*/
function User(user) {
    this.name = user.name;
    this.password = user.password;
}

module.exports = User;

User.prototype.save = function save(callback) {
    // 存入数据库
    var user = {
        name: this.name,
        password: this.password
    };

    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);
        }

        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            collection.ensureIndex('name', {unique: true});
            collection.insert(user, {safe: true}, function (err, user) {
                mongodb.close();
                callback(err, user);
            });
        });
    });
};
/*
    输入参数:
    username: 用户名
    callback: 回调


 */

/*
    在index.js中调用如下

    User.get(newUser.name, function (err, user)   --> function对应了此处的callback

    如果有user, 则传送给回调函数一个err,一个user  --> 传回用户名和相对应的数据库中的密码
    如果没有user, 则传送给回调函数一个err,一个null
 */
User.get = function get(username, callback) {
    /*
        数据库打开
        mongodb.open(callback)
     */
    mongodb.open(function (err, db) {
        /*
            打开之后进入此函数.

            如果失败则返回调用时给出的回调函数

            所以回调函数要有一个参数err
         */
        if (err) {
            return callback(err);
        }

        /*
            数据库打开users这个collection, 打开完毕后调用此时的匿名回调函数
         */
        db.collection('users', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }
            /*
                在collection中寻找一个name为username的对象, 执行完毕后调用此处的匿名回调函数

                findone传入一个criteria,返回一个doc
             */
            collection.findOne({name: username}, function (err, doc) {
                /*
                    执行完毕后则关闭数据库
                 */
                mongodb.close();

                /*
                    如果有匹配name的数据,则用这组数据新建一个对象返回
                 */
                if (doc) {
                    var user = new User(doc);
                    callback(err, user);
                }
                else {
                    callback(err, null);
                }
            });
        });
    });
};
