
// This view will be in charge of the individual Search Items

var app = app || {};

app.SearchItemView = Backbone.View.extend({


    template: _.template($('#search-item-template').html()),

    // DOM events for a SearchItem
    events: {
        'click .add': 'addNewTrackedItem'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    },

    addNewTrackedItem: function() {
        app.UserCollection.add({
            brand: this.model.get('brand'),
            item: this.model.get('item'),
            calories: this.model.get('calories'),
            date: this.model.get('date'),
            order: app.UserCollection.nextOrder()
        });
    }

});