
// Similarly to SearchItemView, the FoodItemView will handle the individual Food Items

var app = app || {};

app.FoodItemView = Backbone.View.extend({

    template: _.template($('#food-item-template').html()),

    // DOM events for a FoodItem
    events: {
        'click .delete': 'removeItem'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        //this.$el.html({
        //    brand: this.model.get('brand'),
        //    item: this.model.get('item'),
        //    calories: this.model.get('calories'),
        //    date: (this.model.get('date')).toLocaleDateString()
        //});
        return this;
    },

    removeItem: function() {
        this.model.destroy();
    }

});

