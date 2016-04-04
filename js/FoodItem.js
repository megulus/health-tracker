
// A model for the food items to be tracked by the user.

var app = app || {};

app.FoodItem = Backbone.Model.extend({
    defaults: {
        brand: '',
        item: '',
        calories: 0,
        date: Date.now()
    }
});