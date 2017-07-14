const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {

        return gulp.src(options.src, { since : gulp.lastRun(options.taskname) })
                .pipe($.debug({ 'title' : 'Coping ...' }))
                .pipe($.newer(options.dst))
                .pipe(gulp.dest(options.dst));

    }

};