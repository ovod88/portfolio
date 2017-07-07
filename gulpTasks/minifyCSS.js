const gulp = require('gulp'),
      debug = require('gulp-debug'),
      minify = require('gulp-clean-css'),
      rename = require('gulp-rename'),
      del = require('del');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(minify())
            .pipe(debug({title: 'Minifying css ...'}))
            .pipe(rename({
                suffix: '.min'
            }))
            .pipe(debug({title: 'Renaming css ...'}))
            .pipe(gulp.dest(options.dst))
            .on('end',function() {
                del(options.src);
            });
    }
}