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

        this._cleanupCurrentView();
        app.data.currentView = new app.views.BooksList({
            collection: app.data.books
        });

        this._activateBooksListPanel();
        $('[data-id=books-list]').append(app.data.currentView.$el);
        app.data.books.fetch({ reset: true });
    },

    book: function (id, bookId) {
        console.log("Book: " + bookId + " for category, " + id);
    },
    unknown: function () {
        console.log("Unknown route");
    },

    _activateBooksListPanel: function (selector) {
        $('[data-id=books-wrapper] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _activateBookDetailPanel: function (selector) {
        $('[data-id=books-wrapper] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _cleanupCurrentView: function () {
        if (app.data.currentView) {
            app.data.currentView.remove();
            app.data.currentView = null;
        }
    }
});