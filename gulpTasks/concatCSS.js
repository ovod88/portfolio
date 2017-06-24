const gulp = require('gulp'),
      debug = require('gulp-debug'),
      concat = require('gulp-concat');

module.exports = function(options) {
    return function() {
        return gulp.src(options.src)
            .pipe(concat(options.dstName))
            .pipe(debug({'title': 'Concatinating CSS ...'}))
            .pipe(gulp.dest(options.dst));
    }
};

// {outputStyle: 'compressed'} with if statement