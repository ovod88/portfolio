const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      config = require('./requireJsOptimizerConfig'),
      path = require('path');

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
                                        baseUrl : 'public/js',
                                        paths   : {
                                            'jquery' : 'bower_components/jquery/dist/jquery',
                                            'lodash' : rpath.dir + '/libs/lodash'
                                        },
                                        name    : rpath.dir + '/' + rpath.name
                                    }))
                                    .pipe($.debug({ title : $.util.colors.yellow('JS optimising ... ') }))
                                    .pipe(gulp.dest(options.dst));

                            }))

        };

};