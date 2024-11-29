describe("models/Book", function () {

    // when
    describe("when building a new model", function () {
        // then
        it("it builds the REST endpoint URL using the ID property", function () {
            var book = new app.models.Book({ id: 'ID' });
            expect(book.url()).to.equal('api/book_ID.json');
        });
    });
});

describe("models/Books", function () {
    it("it builds the REST endpoint with the categoryId passed in the constructor option 'catId'", function () {
        var books = new app.models.Books(null, { catId: 'categoryId' });
        expect(books.url()).to.equal('api/books_categoryId.json');
    });
});

describe("views/BookDetail", function () {

    describe("when initializing", function () {
        it("It re-renders when the model changes", function () {
            var model = new app.models.Book({ id: "id1" });

            var render = sinon.stub(app.views.BookDetail.prototype, "render");
            var view = new app.views.BookDetail({ model: model });

            model.set("property", "value");

            expect(render.called).to.be.true;

            app.views.BookDetail.prototype.render.restore();
        });
    });
    describe("when rendering", function () {

        var modelTemplate = {
            "volumeInfo": {
                "title": "Science Fiction",
                "subtitle": "The 100 Best Novels : an English-language Selection, 1949-1984",
                "authors": [
                    "David Pringle"
                ],
                // "publisher": "Carroll & Graff Publishers",
                "publishedDate": "1997",
                "description": "This guide will appeal to both newcomers and connoisseurs of the genre. Informative and readable, Pringle's choices focus on landmarks by Ray Bradbury, Alfred Bester and J. G. Ballard, unearth such lesser known talents as Ian Watson, Octavia Butler and Joanna Russ, and highlights breakthrough novels by William Gibson and Philip K. Dick.",
                "imageLinks": {
                    "smallThumbnail": "http://books.google.co.uk/books?id=FYtvHQAACAAJ&printsec=frontcover&img=1&zoom=5&imgtk=AFLRE728FHU8gi_QzmBC9IbfblRzITjzGxXGVYyeJ-38CbuSCpkcYTRzpj1UfP9CzMaLE1xkrplBI0CsTOk1R8L69WqmGgCHggji_59PKCevSdccevjMzhA&source=gbs_api",
                    "thumbnail": "http://books.google.co.uk/books?id=FYtvHQAACAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE73hha9HUrm_RIVHvPmdjo2dO_94TFkbbLx5-hRYDxuISeKSLQfHjV2DY2exmUao-rY7E62sfbPTRXDW8-VX5V-fDtDMq-FqE-_GLpWcODogWztyJcM&source=gbs_api"
                }
            }
        };

        it("it doesn't display the publisher if not present in the JSON data", function () {
            var model = new app.models.Book(modelTemplate);
            var view = new app.views.BookDetail({ model: model });

            view.render();
            expect(view.$('[data-id=publisher]').html()).to.equal("");
        });

        it("it renders the author and published date", function () {
            var model = new app.models.Book(modelTemplate);
            var view = new app.views.BookDetail({ model: model });

            view.render();
            expect(view.$('[data-id=date-authors]').text()).to.equal("David Pringle - 1997");
        });
    });

});

describe("routers/Router", function () {

    var router;
    beforeEach(function () {
        var MockRouter = app.routers.Router.extend({
            home: sinon.spy(),
            category: sinon.spy(),
            book: sinon.spy(),
            unknown: sinon.spy()
        });
        router = new MockRouter();

        if (Backbone.History.started !== true) {
            Backbone.history.start();
        }

    });

    afterEach(function () {
        router.navigate("", { trigger: true });
    });

    it('routes to home if no hash fragment is present', function () {
        router.navigate('', { trigger: true });
        expect(router.home.called).to.be.true;
    });

    it('routes to category if hash fragment contains "category/<catid>"', function () {
        router.navigate('category/categoryId', { trigger: true });
        expect(router.category.called).to.be.true;
    });

    it('routes to book if hash fragment contains "category/id/book/id"', function () {
        router.navigate('category/id/book/id', { trigger: true });
        expect(router.book.called).to.be.true;
    });

    it('routes to unknown if hash fragment is not recognized', function () {
        router.navigate('unknown', { trigger: true });
        expect(router.unknown.called).to.be.true;
    });
});