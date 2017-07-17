const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function () {

        return gulp.src(options.src)
                   .pipe($.revReplace({
                        replaceInExtensions : [ '.js', '.css', '.html', '.hbs','.ejs' ],
                        manifest            : gulp.src(options.srcManifest)
                    }))
                   .pipe($.debug({ 'title' : $.util.colors.yellow('Revision replacing...') }))
                   .pipe(gulp.dest(options.dst))

    }

};