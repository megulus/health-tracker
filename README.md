# health-tracker


### Overview

The health tracker app allows a user to build a collection of food items to track. Each item is dated, allowing the user to track by day, week, month and year. The calorie counts of the individual items are displayed in the collection's list view, and the total calories (for the filtered items) are displayed for the collection.

The user can add to the collection by searching for food items in the search bar and selecting items to add to the collection. The search item list view is cleared when a new search is performed. The user can manually delete items from the tracked foods collection, or delete the entire collection (a warning confirms that the user really intends to delete the entire collection).

### Building and Running

The app does not require build tools - it can be run simply by opening 'src/index.html' from a browser (or by serving the 'src' directory on a simple http server). 

However, the gulpfile.js does run some basic optimizations (html/css/js minification) that can improve the app's performance. To run the build tools, first make sure that gulp is installed locally. Then install gulp locally in the project's local directory and run the command 'gulp.' Then follow the instructions in the paragraph above, simply replacing the 'src' directory with the 'build' directory.

### Dependencies

Backbone
jQuery
Underscore
Backbone.Modal
Bootstrap


### Future Improvements/Features

1. Add feature to allow users to change quantities of foods, in addition to simply adding/deleting food items.

2. Add feature to allow users to change the date on food item(s).

3. Better design! Right now, the user interface is pretty barebones. I'd like to make it better.

### Acknowledgements

Thanks to [this Stack Overflow Article](http://stackoverflow.com/questions/10858935/cleanest-way-to-destroy-every-model-in-a-collection-in-backbone) for helping to clear up an issue I ran into in attempting to clear a collection/destroy its models.

I used the [Backbone.Modal.js](http://awkward.github.io/backbone.modal/) plugin to create my modal dialogue box.

This [article on filtering Collections](http://stackoverflow.com/questions/11762105/filter-backbone-collection-by-attribute-value) was helpful in figuring out Backbone's filtering, which was useful for the purposes of sorting by day, week, month and year.

