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
    },

    book: function (id, bookId) {
        console.log("Book: " + bookId + " for category, " + id);
    },
    unknown: function () {
        console.log("Unknown route");
    }
});