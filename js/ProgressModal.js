// Loading indicator modal that will be fired while
// Nutritionix results are loading

var app = app || {};


var ProgressModal = Backbone.Modal.extend({
    template: '#progress-modal'
});

app.ProgressModal = new ProgressModal();

