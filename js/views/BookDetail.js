app.views.BookDetail = Backbone.View.extend({

    template: _.template($('script[data-id=book-detail-view]').html()),

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

        this.$el.html(this.template({
            info: info,
            publisher: publisher,
            images: images
        }));

        return this;
    }
});