// This will kick off our entire application. The AppView needs to be instantiated on page load
// so that its code will be executed.

var app = app || {};
var today = new Date();
var todayWeekday = today.getDay();
var todayDate = today.getDate();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();
//console.log(todayYear, todayMonth, todayDate);


$(function () {

    new app.AppView();

    // Todo: get rid of this, or replace with some real testing

    app.UserCollection.add({
        brand: 'Finest',
        item: 'Grump Chow',
        calories: 47,
        date: (new Date(2015, 0, 14)).getTime()
    });

});
