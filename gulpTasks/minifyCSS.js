const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      del = require('del');

module.exports = function (options) {

    return function () {

        return gulp.src(options.src)
            .pipe($.cleanCss())
            .pipe($.debug({ title : $.util.colors.yellow('Minifying css ...') }))
            .pipe($.rename({
                suffix : '.min'
            }))
            .pipe($.debug({ title : $.util.colors.yellow('Renaming css ...') }))
            .pipe(gulp.dest(options.dst))
            .on('end',function () {

                del(options.src);

            });

    }

}