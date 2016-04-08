// This will kick off our entire application. The AppView needs to be instantiated on page load
// so that its code will be executed.

var app = app || {};
var today = new Date();
var todayMinusSeven = new Date(new Date().setDate(new Date().getDate() - 7));
//var todayDateMinusSeven = todayMinusSeven.getDate();
//var todayWeekday = today.getDay();
var todayDate = today.getDate();
var todayMonth = today.getMonth();
var todayYear = today.getFullYear();



$(function() {

    new app.AppView();


});
