
// This view will be in charge of the individual Search Items

var app = app || {};

app.SearchItemView = Backbone.View.extend({

    //tagName: 'li',

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

    // is this weird?...a DOM event on a SearchItem View is creating a
    // new FoodItem model - not sure if this is Kosher, but don't know how else
    // to handle this
    addNewTrackedItem: function() {
        app.UserCollection.add({
            brand: this.model.get('brand'),
            item: this.model.get('item'),
            calories: this.model.get('calories')
        });
        //console.log(app.UserCollection.models);
    }

});