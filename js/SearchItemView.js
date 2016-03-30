
// This view will be in charge of the individual Search Items

var app = app || {};

app.SearchItemView = Backbone.View.extend({

    tagName: 'li',

    template: _.template($('#search-item-template').html()),

    // DOM events for a SearchItem
    events: {
        'click .add': 'addNewTrackedItem'
    },

    // this is a bit weird...a DOM event on a SearchItem View is creating a
    // new FoodItem model - not sure if this is Kosher, but don't know how else
    // to handle this
    addNewTrackedItem: function() {
        var item = new app.FoodItem({
            brand: this.model.get('brand'),
            item: this.model.get('calories')
        });
    }

});