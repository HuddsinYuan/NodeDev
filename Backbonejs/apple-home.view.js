/**
 * Created by Jonassen on 16/11/10.
 */
var homeView = Backbone.View.extend({
    el: 'body',
    listE1: '.apples-list',
    cartE1: '.cart-box',
    template: _.template('Apple data: \
                <ul class="apples-list">\
                </ul> \
                <div class="cart-box"></div>'),
    initialize: function () {
        this.$el.html(this.template);
        this.collection.on('addToCart', this.showCart, this);
    },
    showCart: function (appleModel) {
        $(this.cartE1).append(appleModel.attributes.name + "<br/>");
    },
    render: function () {
        view = this;
        this.collection.each(function (apple) {
            var appleSubView = new appleItemView({model: apple});
            appleSubView.render();
            $(view.listE1).append(appleSubView.$el);
        });
    }

});