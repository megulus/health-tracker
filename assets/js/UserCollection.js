
// This Collection will also contain FoodItems, but will contain the
// FoodItems that the User chooses to track. It will use persistent
// storage.

var app = app || {};


var UserCollection = Backbone.Collection.extend({

    model: app.FoodItem,
    localStorage: new Backbone.LocalStorage('UserCollection'),

    // Filter the collection for foods eaten this year
    byYear: function() {
        var filtered = this.filter(function(food) {
            return new Date(food.get('date')).getFullYear() === todayYear;
        });
        return filtered;
    },

    // Filter for food eaten this month
    byMonth: function() {
        var filtered = this.byYear().filter(function(food) {
            return new Date(food.get('date')).getMonth() === todayMonth;
        });
        return filtered;
    },

    // Filter by week (last 7 days):
    byWeek: function() {
        var filtered = this.byMonth().filter(function(food) {
            return new Date(food.get('date')) >= todayMinusSeven
                && new Date(food.get('date')) <= today;
        });
        return filtered;
    },

    today: function() {
        var filtered = this.byWeek().filter(function(food) {
            return new Date(food.get('date')).getDate() === todayDate;
        });
        return filtered;
    },


    totalCalories: function() {
        var total = 0;
        var filtered;
        if (app.FoodItemFilter === 'year') {
            filtered = this.byYear();
        } else if (app.FoodItemFilter === 'day') {
            filtered = this.today();
        } else if (app.FoodItemFilter === 'month') {
            filtered = this.byMonth();
        } else if (app.FoodItemFilter === 'week') {
            filtered = this.byWeek();
        } else {
            filtered = this;
        }
        filtered.forEach(function(item) {
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




