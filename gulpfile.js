var gulp = require('gulp'),
    minifyhtml = require('gulp-htmlmin'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    mainBowerFiles = require('main-bower-files'),
    filter = require('gulp-filter');


function errorLog(error) {
    console.error.bind(error);
    this.emit('end');
}


gulp.task('html', function () {
    gulp.src('*.html')
        .pipe(minifyhtml({collapseWhitespace: true}))
        .pipe(gulp.dest('build'))
        .on('error', errorLog);
});


gulp.task('minifycss', function () {
    gulp.src('css/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('build/css'))
        .on('error', errorLog);
});

gulp.task('uglify', function () {
    gulp.src('js/*js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
        .on('error', errorLog)
});

gulp.task('bower', function () {
    return gulp.src(mainBowerFiles(), {base: 'bower_components'})
        .pipe(uglify())
        .pipe(gulp.dest('build/bower_components'))
});

gulp.task('components_css', function () {
    gulp.src('other_components/*.css')
        .pipe(minifycss())
        .pipe(gulp.dest('build/other_components'))
});

gulp.task('components_js', function () {
    gulp.src('other_components/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/other_components'))
});


gulp.task('default', ['html', 'minifycss', 'uglify', 'bower', 'components_css', 'components_js']);