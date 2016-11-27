/**
 * Created by Jonassen on 16/11/10.
 */
var appleItemView = Backbone.View.extend({
    tagName: 'li',
    template: _.template('\
             <a href="#apples/<%=name%>" target="_blank">\
            <%=name%>\
            </a>&nbsp;<a class="add-to-cart" href="#">buy</a>\
            '),
    events: {
        'click .add-to-cart': 'addToCart' // 事件 + jQuery选择器: 函数名
    },
    render: function () {
        this.$el.html(this.template(this.model.attributes));
    },
    addToCart: function () {
        this.model.collection.trigger('addToCart', this.model);
    }
});