const gulp = require('gulp'),
debug = require('gulp-debug'),
      optimize = require('gulp-requirejs-optimize'),
      config = require('./requireJsOptimizerConfig'),
      tap = require('gulp-tap'),
      plumber = require('gulp-plumber'),
      notify = require('gulp-notify'),
      path = require('path');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
               .pipe(plumber({
                        errorHandler: notify.onError(function(err) {
                            return {
                                title: 'Javascript optimizing',
                                message: err.message
                        };
                    })
               }))
              .pipe(tap(function(file, t) {
                var rpath = path.parse(file.relative);
                return gulp.src(options.src)
                       .pipe(optimize({
                            baseUrl: 'public/js',
                            paths: {
                                'jquery': 'bower_components/jquery/dist/jquery',
                                'lodash': rpath.dir + '/libs/lodash'
                            },
                            name: rpath.dir + '/' + rpath.name,
                            // mainConfigFile: "js/dist/main.js"
                        }))
                        .pipe(debug({title: 'JS optimising ... '}))
                        .pipe(gulp.dest(options.dst));
                    }))
    };
};