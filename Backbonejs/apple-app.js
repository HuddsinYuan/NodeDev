/**
 * Created by Jonassen on 16/11/10.
 */
var app;
var appleData = [
    {
        name: "fuji",
        url: "img/fuji.jpg"
    },
    {
        name: "gala",
        url: "img/gala.jpg"
    }
];

var router = Backbone.Router.extend({
    routes: {
        '': 'home',
        'apples/:appleName': 'loadApple'
    },
    initialize: function () {
        // 一些在对象初始化的时候执行的代码,router的构造函数
        var apples = new Apples();
        apples.reset(appleData);
        this.homeView = new homeView({collection: apples});
        this.appleView = new appleView({collection: apples});
    },
    home: function () {
        this.homeView.render();
    },
    loadApple: function (appleName) {
        this.appleView.loadApple(appleName);
    }
});








//开始使用类似jQuery的ready函数 这边利用传统的JQuery的方式并不行
$(function () {
    app = new router;
    Backbone.history.start();
});