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
        this.$input = this.$('#search');
        this.$results = this.$('#search-results');
        this.$tracker = this.$('#calorie-count');
        this.$resultstxt = this.$('#results-txt');

        // bind relevant events on the SearchCollection
        // and UserCollection - when those change, the
        // AppView needs to be updated
        this.listenTo(app.SearchCollection, 'add', this.addSearchItem);
        this.listenTo(app.SearchCollection, 'reset', this.clear);
    },

    // called when SearchCollection reset (so as to display new search
    // results)
    clear: function() {
        _.each(_.clone(app.SearchCollection.models), function(model) {
            model.destroy();
        });
    },

    // will be fired when item added to SearchCollection - new SearchItemView
    // will be created
    addSearchItem: function(item) {
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
        console.log(app.SearchCollection.models);
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
                'limit': 25
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

