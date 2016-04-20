var gulp = require('gulp'),
    minifyhtml = require('gulp-htmlmin'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    usemin = require('gulp-usemin'),
    rename = require('gulp-rename'),
    debug = require('gulp-debug');


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


gulp.task('bower', function () {
    return gulp.src(mainBowerFiles(), {base: 'bower_components'})
        .pipe(debug({ title: 'bower-debug' }))
        .pipe(gulp.dest('build/bower_components'))
});



gulp.task('usemin', function() {
     return gulp.src('*.html')
         .pipe(usemin({
             html: [minifyhtml({ collapseWhitespace: true })],
             css: [minifycss(), 'concat'],
             js: [uglify(), 'concat']
         }))
         .pipe(gulp.dest('build'))
});


gulp.task('default', ['bower', 'usemin']);