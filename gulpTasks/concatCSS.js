const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function(options) {
    return function() {
        let set = false;
        return gulp.src(options.src, {read: false})
               .pipe($.tap(function(file, t) {
                    var rpath = '.';
                    if(path.dirname(file.relative).indexOf('fonts') ==-1 && !set) {
                        set= true;
                        var rpath = path.dirname(file.relative).split(path.sep)[0];
                        return gulp.src(options.src)
                           .pipe($.concat(options.dstName))
                           .pipe($.debug({title: 'Concatinating css ... '}))
                           .pipe($.rename(function(file) {
                                file.dirname = rpath;
                            }))
                           .pipe(gulp.dest(options.dst));
                        }
                }))
    }
};