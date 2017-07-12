const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                .pipe($.revCollector())
                // .pipe($.revDeleteOriginal())
                .pipe($.debug({'title': 'Revision collecting...'}))
                .pipe(gulp.dest('./'))
    }
};