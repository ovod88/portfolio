const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path'),
      configGulp = require('../config').get('gulp');

module.exports = function (options) {

    return function () {

            return gulp.src(options.src)
                .pipe($.plumber({
                            errorHandler : $.notify.onError(function (err) {

                                return {
                                    title   : $.util.colors.red('Javascript optimizing'),
                                    message : err.message
                                };

                            })

                        }))
                .pipe($.tap(function (file, t) {

                                var rpath = path.parse(file.relative);
                                return gulp.src(options.src)
                                    .pipe($.requirejsOptimize({
                                        mainConfigFile : `${configGulp.dstJS}/${rpath.dir}/main.js`,
                                        name           : rpath.dir + '/' + rpath.name
                                    }))
                                    .pipe($.debug({ title : $.util.colors.yellow('JS optimising ... ') }))
                                    .pipe($.uglify())
                                    .pipe(gulp.dest(options.dst));

                            }))

        };

};