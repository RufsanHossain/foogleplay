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
        $('[data-id=books-list]').empty().append(app.data.currentView.$el);
        app.data.books.fetch({ reset: true });
    },

    book: function (id, bookId) {
        console.log("Book: " + bookId + " for category, " + id);
        app.data.book = new app.models.Book({ id: bookId });
        this._cleanupCurrentView();
        app.data.currentView = new app.views.BookDetail({
            model: app.data.book
        });
        this._activateBookDetailPanel();
        $('[data-id=book]').empty().append(app.data.currentView.$el);
        app.data.book.fetch();
    },
    unknown: function () {
        console.log("Unknown route");
    },

    _activateBooksListPanel: function () {
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
        $('[data-id=books-list]').addClass('is-visible');
    },

    _activateBookDetailPanel: function () {
        $('[data-id="books-wrapper"] .is-visible').removeClass('is-visible');
        $('[data-id=book]').addClass('is-visible');
    },

    _cleanupCurrentView: function () {
        if (app.data.currentView) {
            app.data.currentView.remove();
            app.data.currentView = null;
        }
    }
});