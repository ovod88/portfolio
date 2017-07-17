const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function (options) {

    return function () {

        let set = false;
        return gulp.src(options.src, { read : false })
               .pipe($.tap(function (file, t) {

                    var rpath = '.';
                    if (path.dirname(file.path).indexOf('fonts') ==-1 && !set) {

                        set = true;
                        var rpath = path.dirname(file.relative).split(path.sep)[0];
                        return gulp.src(options.src)
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

                    }

                }))

    }

};