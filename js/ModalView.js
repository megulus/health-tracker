// ModalView uses a plugin for Backbone (Backbone.Modal.js)

$(function () {

    // create the modal view class
    var ClearModal = Backbone.Modal.extend({
        template: '#modal-template',
        cancelEl: '#cancel-btn',
        submitEl: '#clear-btn',
        events: {
            'click #clear-btn': 'clearUserCollection'
        },

        clearUserCollection: function () {
            _.each(_.clone(app.UserCollection.models), function (model) {
                model.destroy();
            });
        }
    });

    $('.open').on('click', function () {
        var modalView = new ClearModal();
        $('.modal-div').html(modalView.render().el);
    });


});