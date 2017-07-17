const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      fs = require('fs'),
      through2 = require('through2').obj,
      combine = require('stream-combiner2').obj;

module.exports = function (options) {

    let lintCache = {},
        errorMessage = '',
        lintCacheFile = process.cwd() + '/private/js/lintCache.json';

    try {

        lintCache = JSON.parse(fs.readFileSync(lintCacheFile));

    } catch (error) {

    }

    return function () {

        return gulp.src(options.src, { read : false })
                .pipe($.debug({ 'title' : $.util.colors.yellow('Lint item ... ') }))
                .pipe($.plumber({
                        errorHandler : $.notify.onError(function (err) {

                            return {
                                title   : $.util.colors.red('Javascript linting'),
                                message : err.message
                            };

                        })

                    }))
                .pipe($.if(function (file) {

                        return lintCache[file.path] && lintCache[file.path].mtime == file.stat.mtime.toJSON();

                    },
                    through2(function (file, enc, callback) {

                        file.eslint = lintCache[file.path].eslint;
                        callback(null, file);

                    }),
                    combine(
                        through2(function (file, enc, callback) {

                            file.contents = fs.readFileSync(file.path);
                            callback(null, file);

                        }),
                        $.eslint(),
                        $.debug( { 'title' : $.util.colors.yellow('Linting JS code ...') }),
                        through2(function (file, enc, callback) {

                            lintCache[file.path] = {
                                eslint : file.eslint,
                                mtime  : file.stat.mtime
                            }
                            callback(null, file);

                        })
                    )
                ))
                .pipe(through2(function (file, enc, callback) {

                    if (file.eslint.errorCount) {

                        errorMessage += `Lint detected ${file.eslint.errorCount} errors in ${file.relative}\n`;

                    }
                    callback(null, file);

                },
                    function (callback) {

                        if (errorMessage.length) {

                            this.emit('error', new Error(errorMessage));

                        }
                        callback();

                    }
                    ))
                .pipe($.eslint.format())
                .on('end', function () {

                    fs.writeFileSync(lintCacheFile, JSON.stringify(lintCache));

                });

    }

}