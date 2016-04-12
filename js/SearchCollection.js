
// Collection for FoodItem models displayed as result of API search
// This does not require persistent storage, so it will use an ordinary
// Backbone Collection

var app = app || {};

var SearchCollection = Backbone.Collection.extend({
    model: app.SearchItem
});

app.SearchCollection = new SearchCollection();