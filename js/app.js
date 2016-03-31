
// This will kick off our entire application. The AppView needs to be instantiated on page load
// so that its code will be executed.

var app = app || {};
var today = new Date();
var todayWeekday = today.getDay();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();
//console.log(todayWeekday, todayMonth, todayYear);



$(function() {

    new app.AppView();

});
