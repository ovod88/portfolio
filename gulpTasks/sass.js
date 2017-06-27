const gulp = require('gulp'),
      debug = require('gulp-debug'),
      sass = require('gulp-sass'),
      gulpif = require('gulp-if'),
      sourcemap = require('gulp-sourcemaps'),
      rename = require('gulp-rename'),
      isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function(options) {
    let sassOptions = { 
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    return function() {
        return gulp.src(options.src)
            .pipe(gulpif(isDevelopment, sourcemap.init({largeFile: true})))
            .pipe(sass(sassOptions).on('error', sass.logError))
            .pipe(gulpif(isDevelopment, sourcemap.write()))
            .pipe(debug({'title': 'Compiling sass ...'}))
            .pipe(rename(function(path) {
                path.basename = 'style';
            }))
            .pipe(debug({'title': 'Renaming destination file ...'}))
            .pipe(gulp.dest(options.dst));
    }
};

//AUTOPREFIXER