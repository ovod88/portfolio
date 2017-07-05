const gulp = require('gulp'),
      newer = require('gulp-newer'),
      debug = require('gulp-debug');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, {base: options.base})
               .pipe(newer(options.dst))
               .pipe(debug({title: 'JS copying ...'}))
               .pipe(gulp.dest(options.dst));
    }
}