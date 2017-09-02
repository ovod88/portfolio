const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      combine = require('stream-combiner2').obj,
      fs = require('fs'),
      through2 = require('through2').obj;

module.exports = function (options) {

    return function () {

                return gulp.src(options.src, { base : options.base })
                    .pipe($.if(function (file) {

                            return (file.relative.indexOf('libs') == -1) &&
                                (file.relative.indexOf('bower_components') == -1)
                                && (file.relative.indexOf('projects') == -1);

                        },
                        combine(
                            $.debug({ title : $.util.colors.yellow('Babeling ...') }),
                            $.babel({
                                presets : [ 'es2015' ]
                            })
                        ),
                        combine(
                            $.newer(options.dst),
                            $.debug({ title : $.util.colors.yellow('JS copying ...') })
                        )
                    ))
                    .pipe(gulp.dest(options.dst));

            }

}