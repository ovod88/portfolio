const gulp = require('gulp'),
      newer = require('gulp-newer'),
      debug = require('gulp-debug'),
      gulpIf = require('gulp-if'),
      combine = require('stream-combiner2').obj,
      babel = require('gulp-babel'),
      clone = require('gulp-clone');

module.exports = function (options) {
    return function () {
        return gulp.src(options.src, {base: options.base})
               .pipe(newer(options.dst))
               .pipe(gulpIf(function(file) {
                    return (file.relative.indexOf('libs') == -1) 
                            && (file.relative.indexOf('bower_components') == -1);        
               },
                 combine(
                   debug({title: 'Babeling ...'}),
                   babel({
                       presets: ['es2015']
                   })
               ),
                 debug({title: 'JS copying ...'})
               ))
               .pipe(gulp.dest(options.dst));
    }
}