const gulp = require('gulp'),
      debug = require('gulp-debug'),
      concat = require('gulp-concat-css'),
      tap = require('gulp-tap'),
      path = require('path');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(concat(options.dstName))
            .pipe(tap(function(file, t) {
                var rpath = path.parse(file.relative);
                return gulp.src(options.src)
                .pipe(debug({'title': 'Concatinating CSS ...'}))
                .pipe(gulp.dest(options.dst + rpath.dir));
        }))
    }
};