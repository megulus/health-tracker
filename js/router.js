
// The health tracker app will support the following routes:
//      #/ (default - all food items)
//      #/day - foods eaten today
//      #/week - foods eaten in last 7 days
//      #/month - foods eaten this month
//      #/year  - foods eaten this year

var app = app || {};

var HealthTrackerRouter = Backbone.Router.extend({

    routes: {
        '/year': 'showYear'
    },

    index: function() {

    },

    showYear: function() {
        console.log('show year');
        app.UserCollection.byYear();
        app.AppView.displayCalories(app.UserCollection.byYear());
    }

});

app.AppRouter = new HealthTrackerRouter();
Backbone.history.start();