
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
        var new_fooditem = new app.FoodItem(this.model.attributes);
        app.UserCollection.add(new_fooditem);
        new_fooditem.save();
    }

});