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




        // bind relevant events on the SearchCollection
        // and UserCollection - when those change, the
        // AppView needs to be updated
        this.listenTo(app.SearchCollection, 'add', this.addSearchItem);
        this.listenTo(app.SearchCollection, 'reset', this.clear);
        this.listenTo(app.UserCollection, 'add', this.toggleClearLink);
        this.listenTo(app.UserCollection, 'add', this.addFoodItem);
        this.listenTo(app.UserCollection, 'add', this.displayCalories);
        this.listenTo(app.UserCollection, 'remove', this.toggleClearLink);
        this.listenTo(app.UserCollection, 'remove', this.removeFoodItem);
        this.listenTo(app.UserCollection, 'remove', this.displayCalories);
        this.listenTo(app.UserCollection, 'filter', this.filterAll);
        this.listenTo(app.UserCollection, 'all', this.render);
    },

    render: function () {

        var total = app.UserCollection.totalCalories();
        this.$counter.html('');
        this.$counter.append(total);


    },

    filterAll: function() {
        app.UserCollection.each(this.filterOne, this);
    },

    // trigger custom event 'visible'
    filterOne: function(todo) {
        todo.trigger('visible');
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



    addFoodItem: function (item) {
        var view = new app.FoodItemView({model: item});
        this.$tracker.append(view.render().el);
    },

    // called when SearchCollection reset (so as to display new search
    // results)
    clear: function () {
        _.each(_.clone(app.SearchCollection.models), function (model) {
            model.destroy();
        });
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
    },

    getFoodItems: function (queryString) {
        //var indicator = new ProgressModal();
        $('.modal-div').html(app.ProgressModal.render().el);
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
                app.ProgressModal.destroy();
                that.populateSearchCollection(data);
            })
            .error(function (e) {
                app.ProgressModal.destroy();
                console.log('error: ' + e.message);
                that.$results.append('<div>Search results could not be retrieved. Please try again later.</div>');
            });
    }


});

