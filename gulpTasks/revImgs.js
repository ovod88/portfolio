const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                .pipe($.rev())
                .pipe($.revDeleteOriginal())
                .pipe($.debug({'title': 'Revisioning images...'}))
                .pipe(gulp.dest(options.dst))
                .pipe($.rev.manifest('imgs.json'))
                .pipe(gulp.dest(options.dstManifest))
    }
};