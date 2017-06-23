'use strict';
const gulp = require('gulp');

function lazyTaskRequest(taskName, path, options) {
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
      let task = require(path).call(this, options)  ;

        return task(callback);
    })
}

lazyTaskRequest('copyTest', './gulpTasks/copyTest', {
    src: 'private/**/*.*',
    dst: 'public'
});

lazyTaskRequest('cleanJS', './gulpTasks/del', {
   dst: 'public/js'
});

lazyTaskRequest('cleanCSS', './gulpTasks/del', {
    dst: 'public/css'
});

lazyTaskRequest('cleanImgs', './gulpTasks/del', {
    dst: 'public/imgs'
});

lazyTaskRequest('clean', './gulpTasks/del', {
    dst: 'public'
});

lazyTaskRequest('sass', './gulpTasks/sass', {
    src: 'private/css/style.scss',
    base: 'private',
    dst: 'public'
});

// gulp.task('build-js-prod', gulp.series());//TODO
// gulp.task('build-js-dev', gulp.series());//TODO

gulp.task('build-styles', gulp.series('cleanCSS', 'sass'));//TODO
// gulp.task('build-images', gulp.series());//TODO

// gulp.task('build', gulp.series());//TODO

