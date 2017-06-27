const gulp = require('gulp'),
      newer = require('gulp-newer'),
      debug = require('gulp-debug');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src, {since: gulp.lastRun(options.taskname)})
                .pipe(debug({'title': 'Coping favicon...'}))
                .pipe(newer(options.dst))
                .pipe(gulp.dest(options.dst));
    }
};