const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                .pipe($.debug({'title': 'Coping CSS styles...'}))
                .pipe(gulp.dest(options.dst));
    }
};