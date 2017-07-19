const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {

        return gulp.src(options.srcFiles)
                .pipe($.appendPrepend.prependFile(options.requireConfig))
                .pipe($.debug({ 'title' : $.util.colors.yellow('Add requireJS config to all files ...') }))
                .pipe(gulp.dest(options.dst));

    }

};