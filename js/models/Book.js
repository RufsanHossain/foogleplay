app.models.Book = Backbone.Model.extend({
    // initialize: function (attributes, options) {
    //     this.options = options;
    //     this.catId = this.options.catId;
    //     this.bookId = this.options.bookId;
    // },
    url: function () {
        return 'api/book_' + this.get("id") + '.json';
    }
});