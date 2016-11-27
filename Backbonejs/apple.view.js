/**
 * Created by Jonassen on 16/11/10.
 */
/**
 * Created by Jonassen on 16/11/10.
 */
var appleView = Backbone.View.extend({
    initialize: function () {
        //模型改变的时候调用render
        this.model = new (Backbone.Model.extend({}));
        this.model.bind('change', this.render, this);
        //事件spinner触发 调用showSpinner方法
        this.bind('spinner', this.showSpinner, this);
    },

    //创建一个GIF图标属性
    templateSpinner: '<img src="img/spinner.gif" width="30"/>',

    //创建模板 可以使得内容以如下形式来得到形式
    template: _.template(
        '<figure>\
            <img src="<%= attributes.url%>"/>\
            <figcaption><%=attributes.name%></figcaption> \
         </figure>'),

    loadApple: function (appleName) {
        this.trigger('spinner');
        var view = this; //设定作用域,需要在闭包内访问VIEW
        setTimeout(function () {
            view.model.set(view.collection.where({
                name: appleName
            })[0].attributes);
        }, 1000);
    },

    render: function (appleName) {
        var appleHtml = this.template(this.model);
        $('body').html(appleHtml);
    },

    showSpinner: function () {
        $('body').html(this.templateSpinner);
    }
});