const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function (options) {

    return function () {

        return gulp.src(options.src, { read : false })
            .pipe($.debug({ title : $.util.colors.yellow('Here are the files ') }))
            .pipe($.tap(function (file, t) {

                var rpath = path.dirname(file.relative);
                rpath = rpath.split(path.sep).slice(0, -1).join(path.sep);

                return gulp.src([ options.srcLibs, options.base + '/' +
                          rpath.split(path.sep).slice(0, -1).join('/') + '/libs/*.css', file.path ])
                    .pipe($.debug({ title : $.util.colors.yellow('Here are the files inside...') }))
                    .pipe($.autoprefixer({
                        browsers : [ 'last 2 versions' ],
                        cascade  : false
                    }))
                    .pipe($.concat(options.dstName))
                    .pipe($.debug({ title : $.util.colors.yellow('Concatinating css ... ') }))
                    .pipe($.rename(function (file) {

                        file.dirname = rpath;

                    }))
                    .pipe(gulp.dest(options.dst));

            }));

    };

};