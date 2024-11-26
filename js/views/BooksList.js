app.views.BooksList = Backbone.View.extend({
    initialize: function (options) {
        this.options = options;
    },
    render: function () {
        console.log("BookList: render");
        this.$el.html('<h1>Books List</h1>');
        return this;
    }
});