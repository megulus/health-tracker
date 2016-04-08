
// The health tracker app will support the following routes:
//      #/ (default - all food items)
//      #/day - foods eaten today
//      #/week - foods eaten in last 7 days
//      #/month - foods eaten this month
//      #/year  - foods eaten this year

var app = app || {};

var HealthTrackerRouter = Backbone.Router.extend({

    routes: {
        '': 'defaultRoute',
        'year': 'showYear',
        'day': 'showToday',
        'week': 'showWeek',
        'month': 'showMonth'
    },

    // default filter setting is to display total (param = ''):
    setFilter: function(param) {
        app.FoodItemFilter = param;
        app.UserCollection.trigger('filter');
    },


    deactivateTabs: function() {
        var tabs = [$('#total'), $('#day'), $('#week'), $('#month'), $('#year')];
        tabs.forEach(function($tab) {
            $tab.removeClass('active');
        })
    },


    defaultRoute: function(other) {
        this.deactivateTabs();
        $('#total').toggleClass('active');
        this.setFilter('');
    },

    showYear: function() {
        this.deactivateTabs();
        $('#year').toggleClass('active');
        this.setFilter('year');
    },

    showToday: function() {
        this.deactivateTabs();
        $('#day').toggleClass('active');
        this.setFilter('day');
    },

    showWeek: function() {
        this.deactivateTabs();
        $('#week').toggleClass('active');
        this.setFilter('week');
    },

    showMonth: function() {
        this.deactivateTabs();
        $('#month').toggleClass('active');
        this.setFilter('month');
    }

});

var router = new HealthTrackerRouter();
Backbone.history.start();

