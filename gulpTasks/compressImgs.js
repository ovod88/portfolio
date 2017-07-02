const gulp = require('gulp'),
      debug = require('gulp-debug'),
      newer = require('gulp-newer'),
      image = require('gulp-image');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, {since: gulp.lastRun(options.taskname)})
               .pipe(newer(options.dst))
               .pipe(debug({'title': 'Compressing images ...'}))
               .pipe(image())
               .pipe(debug({'title': 'Compressed images ...'}))
               .pipe(gulp.dest(options.dst));
    }
}