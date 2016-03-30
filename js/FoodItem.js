
// A model for the food items to be tracked by the user.

var app = app || {};

app.FoodItem = Backbone.Model.extend({
    defaults: {
        brand: 'Not specified',
        item: 'Not specified',
        calories: 0,
        date: new Date(Date.now())
    }
});