
// This Collection will also contain FoodItems, but will contain the
// FoodItems that the User chooses to track. It will use persistent
// storage.

var app = app || {};

var UserCollection = Backbone.Firebase.Collection.extend({
    model: app.FoodItem,
    url: 'https://popping-fire-4784.firebaseIO.com',

    // Filter the collection for foods eaten today
    byYear: function() {
        var filtered = this.filter(function(food) {
            return food.get('date').getYear() === todayYear;
        });
        return new UserCollection(filtered);
    }

});

app.UserCollection = new UserCollection();

