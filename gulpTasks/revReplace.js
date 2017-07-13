const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function(options) {
    return function () {
        return gulp.src(options.src)
                   .pipe($.revReplace({
                       replaceInExtensions: ['.js', '.css', '.html', '.hbs','.ejs'],
                       manifest: gulp.src(options.srcManifest)
                    }))
                   .pipe($.debug({'title': 'Revision replacing...'}))
                   .pipe(gulp.dest(options.dst))
    }
};