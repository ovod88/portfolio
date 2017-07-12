const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                .pipe($.rev())
                .pipe($.revDeleteOriginal())
                .pipe($.debug({'title': 'Revisioning js...'}))
                .pipe(gulp.dest(options.dst))
                .pipe($.rev.manifest('js.json'))
                .pipe(gulp.dest(options.dstManifest))
    }
};