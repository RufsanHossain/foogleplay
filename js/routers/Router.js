app.routers.Router = Backbone.Router.extend({
    routes: {
        'category/:id': 'category',
        'category/:id/book/:bookId': 'book',
        '': 'home',
        '*default': 'unknown'
    },
    home: function () {
        console.log("Home");
    },
    category: function (id) {
        console.log("Category: " + id);
        app.data.books = new app.models.Books(null, { catId: id });
        console.log(app.data.books.url());
        app.data.currentView = app.views.BooksList({
            collection: app.data.books
        });
        app.data.books.fetch();
    },

    book: function (id, bookId) {
        console.log("Book: " + bookId + " for category, " + id);
    },
    unknown: function () {
        console.log("Unknown route");
    }
});