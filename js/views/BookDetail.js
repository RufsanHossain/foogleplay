app.views.BookDetail = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },
    render: function () {

        var images = this.model.get("volumeInfo").imageLinks;

        this.$el.html(
            '<header class="book-header content content-constrained row">' +
            '<div class="column thumb-image">' +
            '<img src="' + (images.small || images.thumbnail) + '" alt="">' +
            '</div>' +
            '<div class="column l-pad">' +
            '<div class="title">Six Scifi Stories Volume Four</div>' +
            '<div>' +
            '<em>Robert Jesconek</em> - 2014-04-23 <br>' +
            'Pie Press - Publisher' +
            '</div>' +
            '</div>' +
            '</header>' +
            '<div class="content book-content content-constrained standout">' +
            '<h1 class="title">Description</h1>' +
            '<p>' +
            'Six Scifi Stories Volume Four is a collection of six novels by Robert Jesconek, published by Pie Press.The stories are set in the 21st century, and they explore themes such as love, morality, and the nature of reality.' +
            '</p >' +
            '</div >'
        );

        return this;
    }
});