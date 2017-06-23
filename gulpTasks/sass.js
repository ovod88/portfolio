const gulp = require('gulp'),
      debug = require('gulp-debug'),
      sass = require('gulp-sass'),
      isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    return function() {
        return gulp.src(options.src, {base: options.base})
            .pipe(sass().on('error', sass.logError))
            .pipe(debug({'title': 'Compiling sass ...'}))
            .pipe(gulp.dest(options.dst));
    }
};

// {outputStyle: 'compressed'} with if statement