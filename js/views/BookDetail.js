app.views.BookDetail = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.model, "change", this.render);
    },
    render: function () {

        var info = this.model.get("volumeInfo");
        var images = info.imageLinks;

        var publisher = "";

        if (info.publisher) {
            publisher = info.publisher + ' - Publisher';
        }

        this.$el.html(
            '<header class="book-header content content-constrained row">' +
            '<div class="column thumb-image">' +
            '<img src="' + (images.small || images.thumbnail) + '" alt="">' +
            '</div>' +
            '<div class="column l-pad">' +
            '<div class="title">' + info.title + '</div>' +
            '<div>' +
            (info.authors ? '<em>' + info.authors.join(" - ") + '</em>' : "" + info.publishedDate) + ' <br>' +
            publisher +
            '</div>' +
            '</div>' +
            '</header>' +
            '<div class="content book-content content-constrained standout">' +
            '<h1 class="title">Description</h1>' +
            info.description +
            '</div >'
        );

        return this;
    }
});