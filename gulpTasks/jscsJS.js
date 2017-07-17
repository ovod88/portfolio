const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {

        return gulp.src(options.src)
        .pipe($.debug({ 'title' : $.util.colors.yellow('Javascript style checking ... ') }))
        .pipe($.plumber({
                        errorHandler : $.notify.onError(function (err) {

                            return {
                                title   : $.util.colors.red('Javascript style checking ...'),
                                message : err.message
                            };

                        })

                    }))
        .pipe($.jscs())
        .pipe($.jscsStylish())
        .pipe($.jscs.reporter('fail'))

    }

}