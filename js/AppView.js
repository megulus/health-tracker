// The AppView will handle the creation of FoodItems to populate
// the search results, as well as the rendering of the user's
// calorie count/food item tracker

var app = app || {};

// A view for the entire application
app.AppView = Backbone.View.extend({
    el: $('#healthapp'),

    events: {
        // enter key triggers click event, no need for separate keypress event
        'click #search-button': 'search'
        //'click #year' : 'filterYear'
    },

    initialize: function () {

        var that = this;
        this.$input = this.$('#search');
        this.$results = this.$('#search-results');
        this.$counter = this.$('.calories');
        this.$resultstxt = this.$('#results-txt');
        this.$clearTracker = this.$('#clear-tracker');
        this.$tracker = this.$('#foods-tracked');

        // check whether clear link should be displayed:
        this.toggleClearLink();

        // populate the DisplayCollection from the UserCollection
        /*app.DisplayCollection = app.DisplayCollection || new DisplayCollection();
        app.UserCollection.on('sync', function() {
            console.log('trying to clone user collection');
            _.each(_.clone(app.UserCollection.models), function (model) {
                console.log('cloning UserCollection');
                app.DisplayCollection.add(model);
            });
        });*/


        // bind relevant events on the SearchCollection
        // and UserCollection - when those change, the
        // AppView needs to be updated
        this.listenTo(app.SearchCollection, 'add', this.addSearchItem);
        this.listenTo(app.SearchCollection, 'reset', this.clear);
        this.listenTo(app.UserCollection, 'add', this.toggleClearLink);
        this.listenTo(app.UserCollection, 'add', this.addFoodItem);
        //this.listenTo(app.DisplayCollection, 'add', this.addFoodItem);
        //this.listenTo(app.DisplayCollection, 'remove', this.displayCalories);
        //this.listenTo(app.DisplayCollection, 'add', this.displayCalories);
        //this.listenTo(app.DisplayCollection, 'remove', this.render);
        this.listenTo(app.UserCollection, 'add', this.displayCalories);
        this.listenTo(app.UserCollection, 'remove', this.toggleClearLink);
        this.listenTo(app.UserCollection, 'remove', this.removeFoodItem);
        this.listenTo(app.UserCollection, 'remove', this.displayCalories);
        this.listenTo(app.UserCollection, 'filter', this.filterAll);
        this.listenTo(app.UserCollection, 'all', this.render);
        // todo: go through the list above and see which are really necessary
    },

    render: function () {
        // todo: render callories according to app.FoodItemFilter
        // todo: based on filter, call appropriate collection filter + sum the calories
        // todo: get rid of displayCalories
        //this.displayCalories();
        var total = app.UserCollection.totalCalories();
        /*if (app.FoodItemFilter === 'year') {
            var byYear = app.UserCollection.byYear();
            console.log(byYear);
            total = app.UserCollection.totalCalories(byYear);
        } else if (app.FoodItemFilter === 'week') {
            total = app.UserCollection.byWeek().totalCalories();
        } else if (app.FoodItemFilter === 'day') {
            total = app.UserCollection.today().totalCalories();
            console.log(app.UserCollection.today());
            console.log(total);
        } else if (app.FoodItemFilter === 'month') {
            total = app.UserCollection.byMonth().totalCalories();
        } else {
            total = app.UserCollection.totalCalories();
        }*/

        this.$counter.html('');
        this.$counter.append(total);


    },

    /*filterYear: function() {
     console.log('this year');
     app.UserCollection.byYear();
     this.displayCalories();
     },*/

    filterAll: function() {
        app.UserCollection.each(this.filterOne, this);
    },

    // trigger custom event 'visible'
    filterOne: function(todo) {
        todo.trigger('visible');
    },

    // todo: get rid of this - moving to render
    displayCalories: function () {
        this.$counter.html('');
        var total = app.UserCollection.totalCalories();
        //var total = app.DisplayCollection.totalCalories();
        this.$counter.append(total);
    },


    toggleClearLink: function () {
        if (!app.UserCollection.length) {
            this.$clearTracker.addClass('hide');
        } else {
            if (this.$clearTracker.hasClass('hide')) {
                this.$clearTracker.removeClass('hide');
            }

        }
    },

    // todo: um, don't think this is doing much of anything
    removeFoodItem: function () {
        //this.displayCalories();
    },

    addFoodItem: function (item) {
        var view = new app.FoodItemView({model: item});
        this.$tracker.append(view.render().el);
        //this.displayCalories();
    },

    // called when SearchCollection reset (so as to display new search
    // results)
    // todo: should this be a SearchCollection method?
    clear: function () {
        _.each(_.clone(app.SearchCollection.models), function (model) {
            model.destroy();
        });
        // update calorie display:
        //this.displayCalories();
    },

    // will be fired when item added to SearchCollection - new SearchItemView
    // will be created
    addSearchItem: function (item) {
        var view = new app.SearchItemView({model: item});
        this.$resultstxt.addClass('hide');
        this.$results.append(view.render().el);
    },

    search: function (event) {
        this.getFoodItems(this.$input.val().trim());
        // reset the input:
        this.$input.val('');
        return false;
    },

    populateSearchCollection: function (data) {
        // clear out old results, if any:
        this.clear();
        var foodDataArray = data.hits;
        // create FoodItem for each item in array
        foodDataArray.forEach(function (obj) {
            var brand;
            if (obj.fields.brand_name === 'Nutritionix') {
                brand = 'Not specified';
            } else {
                brand = obj.fields.brand_name;
            }
            var item = obj.fields.item_name;
            var calories = obj.fields.nf_calories;
            app.SearchCollection.add({
                brand: brand,
                item: item,
                calories: calories
            });
        });
        //console.log(app.SearchCollection.models);
    },

    getFoodItems: function (queryString) {
        var that = this;
        var url = 'https://api.nutritionix.com/v1_1/search',
            requestData = {
                'appId': '04955d93',
                'appKey': '749c36488818a1a355ece58154cef3ab',
                'query': queryString,
                'fields': ['item_name', 'brand_name', 'nf_calories', 'item_type'],
                'offset': 0,
                'limit': 40
            };

        var xhr = $.ajax({
                type: 'POST',
                url: url,
                data: requestData,
                headers: {'contentType': 'application/JSON'}
            })
            .done(function (data) {
                that.populateSearchCollection(data);
            })
            .error(function (e) {
                console.log('error: ' + e.message);
            });
    }


});

