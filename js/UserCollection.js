
// This Collection will also contain FoodItems, but will contain the
// FoodItems that the User chooses to track. It will use persistent
// storage.

var app = app || {};

// todo: order collection according to order models added

var UserCollection = Backbone.Firebase.Collection.extend({
    url: 'https://popping-fire-4784.firebaseIO.com',
    model: app.FoodItem,
    autoSync: true,

    // Filter the collection for foods eaten this year
    byYear: function() {
        var filtered = this.filter(function(food) {
            return new Date(food.get('date')).getFullYear() === todayYear;
        });
        console.log(filtered);
        return filtered;
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

    // todo: moved - for now at least - to DisplayCollection; get rid of it permanently if that works
    // todo: moved this back here, trying to undo the DisplayCollection tactic
    totalCalories: function() {
        var total = 0;
        this.each(function(item) {
            total += Math.round(item.get('calories'));
        });
        return total;
    },

    // based on the Osmani function to order to-dos
    nextOrder: function() {
        if (!this.length) {
            return 1;
        } else {
            return this.last().get('order') + 1;
        }
    }


});

app.UserCollection = new UserCollection();


