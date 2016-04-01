
// This Collection will also contain FoodItems, but will contain the
// FoodItems that the User chooses to track. It will use persistent
// storage.

var app = app || {};

var UserCollection = Backbone.Firebase.Collection.extend({
    model: app.FoodItem,
    url: 'https://popping-fire-4784.firebaseIO.com',

    // Filter the collection for foods eaten this year
    byYear: function() {
        var filtered = this.filter(function(food) {
            return food.get('date').getYear() === todayYear;
        });
        return new UserCollection(filtered);
    },

    // Filter for food eaten this month
    byMonth: function() {
        var filtered = this.byYear().filter(function(food) {
            return food.get('date').getMonth() === todayMonth;
        });
        return new UserCollection(filtered);
    },

    // Filter by week (last 7 days):
    byWeek: function() {
        var filtered = this.filter(function(food) {
            return food.get('date').getDate() >= today - 7 && food.get('date').getDate() <= today;
        });
        return new UserCollection(filtered);
    },

    today: function() {
        var filtered = this.filter(function(food) {
            return food.get('date').getDate() === today;
        });
        return new UserCollection(filtered);
    },

    totalCalories: function() {
        var total = 0;
        this.each(function(item) {
            total += Math.round(item.get('calories'));
        });
        return total;
    }


});

app.UserCollection = new UserCollection();

