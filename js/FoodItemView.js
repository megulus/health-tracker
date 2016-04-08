
// Similarly to SearchItemView, the FoodItemView will handle the individual Food Items

var app = app || {};

app.FoodItemView = Backbone.View.extend({

    template: _.template($('#food-item-template').html()),

    // DOM events for a FoodItem
    events: {
        'click .delete': 'removeItem'
    },

    initialize: function() {
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
        this.listenTo(this.model, 'visible', this.toggleVisible);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        this.toggleVisible();
        return this;
    },

    toggleVisible: function() {
        this.$el.toggleClass('hide', this.isHidden());
    },

    // Determine whether food item should be hidden:
    isHidden: function() {
        var itemDate = new Date(this.model.get('date'));
        var itemDay = itemDate.getDate();
        var itemMonth = itemDate.getMonth();
        var itemYear = itemDate.getFullYear();
        var todayMinusSeven = new Date(new Date().setDate(new Date().getDate() - 7));
        var thisWeek = (itemDate >= todayMinusSeven && itemDate <= today);
        return (
            (itemYear !== todayYear && app.FoodItemFilter === 'year')
            || (itemMonth !== todayMonth && app.FoodItemFilter === 'month')
            || (itemDay !== todayDate && app.FoodItemFilter === 'day')
            || (!thisWeek && app.FoodItemFilter === 'week')
        );
    },

    removeItem: function() {
        this.model.destroy();
    }

});

