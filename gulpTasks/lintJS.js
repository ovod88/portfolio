const gulp = require('gulp'),
      plumber = require('gulp-plumber'),
      fs = require('fs'),
      through2 = require('through2').obj,
      combine = require('stream-combiner2').obj,
      gulpIf = require('gulp-if'),
      debug = require('gulp-debug'),
      lint = require('gulp-eslint'),
      notify = require('gulp-notify');

module.exports = function(options) {
    let lintCache = {},
        errorMessage = '',
        lintCacheFile = process.cwd() + '/private/js/lintCache.json';

    try {
        lintCache = JSON.parse(fs.readFileSync(lintCacheFile));
    } catch (error) {}


    return function() {
        return gulp.src(options.src, {read: false})
                .pipe(debug({'title': 'Lint item ... '}))
                .pipe(plumber({
                        errorHandler: notify.onError(function(err) {
                            return {
                                title: 'Javascript linting',
                                message: err.message
                        };
                    })
                }))
               .pipe(gulpIf(function(file){
                        return lintCache[file.path] && lintCache[file.path].mtime == file.stat.mtime.toJSON();
                    },
                    through2(function(file, enc, callback) {
                        file.eslint = lintCache[file.path].eslint;
                        callback(null, file);
                    }),
                    combine(
                        through2(function(file, enc, callback) {
                            file.contents = fs.readFileSync(file.path);
                            callback(null, file);
                        }),
                        lint(),
                        debug({ 'title': 'Linting JS code ...'}),
                        through2(function(file, enc, callback) {
                            lintCache[file.path] = {
                                eslint: file.eslint,
                                mtime: file.stat.mtime
                            }
                            callback(null, file);
                        })
                    )
              ))
              .pipe(through2(function(file, enc, callback) {
                    if(file.eslint.errorCount) {
                        errorMessage += `Lint detected ${file.eslint.errorCount} errors in ${file.relative}\n`;
                    }
                    callback(null, file);
                },
                function(callback) {
                    if(errorMessage.length) {
                        this.emit('error', new Error(errorMessage));
                    }
                    callback();
                }))
              .pipe(lint.format())
              .on('end', function() {
                  fs.writeFileSync(lintCacheFile, JSON.stringify(lintCache));
              })   
    }
}