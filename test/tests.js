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