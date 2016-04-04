
// A model for the food items returned by the Nutritionix API.

var app = app || {};

app.SearchItem = Backbone.Model.extend({
    defaults: {
        brand: 'Not specified',
        item: 'Not specified',
        calories: 0,
        date: Date.now()
    }
});