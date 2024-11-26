app.models.Books = Backbone.Collection.extend({
    initialize: function (models, options) {
        this.options = options;
    },
    url: function () {
        return 'api/books_' + this.options.catId + '.json';
    }
});