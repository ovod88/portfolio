const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {

            return gulp.src(options.src,{ since : gulp.lastRun(options.taskname) })
                .pipe($.plumber({
                        errorHandler : $.notify.onError(function (err) {

                            return {
                                title   : $.util.colors.red('Compressing images'),
                                message : err.message
                            };

                        })
                    }))
               .pipe($.newer(options.dst))
               .pipe($.debug({ 'title' : $.util.colors.yellow('Compressing images ...') }))
               .pipe($.image())
               .pipe($.debug({ 'title' : $.util.colors.yellow('Compressed images ...') }))
               .pipe(gulp.dest(options.dst));

        }

}