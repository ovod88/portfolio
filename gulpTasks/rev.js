const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                .pipe($.tap(function(file, t) {
                    var dir = path.dirname(file.relative).split(path.sep)[0];

                    return gulp.src(options.src)
                           .pipe($.rev())
                           .pipe($.revDeleteOriginal())
                           .pipe($.debug({'title': 'Revisioning ...'}))
                           .pipe(gulp.dest(options.dst))
                           .pipe($.rev.manifest(options.name +  '.json'))
                           .pipe(gulp.dest(options.dstManifest + '/' + dir))
                }))         
    }
};