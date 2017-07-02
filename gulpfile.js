'use strict';
const gulp = require('gulp');

function lazyTaskRequest(taskName, path, options) {
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {
      let task = require(path).call(this, options)  ;

        return task(callback);
    })
}

lazyTaskRequest('copyfavicon', './gulpTasks/favicon', {
    taskname: 'copyfavicon',
    src: 'private/imgs/favicon.ico',
    dst: 'public/imgs/'
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
    src: 'private/css/sass/**/*.*',
    dst: 'public/css'
});

lazyTaskRequest('sprite', './gulpTasks/sprite', {
    src: 'private/imgs',
    dstImg: 'public/imgs/',
    dstCss: 'private/css/sass/'
});

lazyTaskRequest('compress-imgs', './gulpTasks/compressImgs', {
    taskname: 'compress-imgs',
    src: 'private/imgs/**/pics/*.{png,jpeg,jpg}',
    dst: 'public/imgs'
});

gulp.task('watch',function() {
    gulp.watch('private/css/sass/**/*.*', gulp.series('sass'));//TODO ADD JS
});

// lazyTaskRequest('concatCSS', './gulpTasks/concatCSS', {
//     src: ['private/css/core.css'],
//     dstName: 'style.css',
//     dst: 'public/css'
// });

// gulp.task('build-js-prod', gulp.series());//TODO
// gulp.task('build-js-dev', gulp.series());//TODO



gulp.task('build-styles', gulp.series('cleanCSS', 'sass'));
gulp.task('build-styles-dev', gulp.series('cleanCSS', 'sass', 'watch'));

gulp.task('build-images', gulp.series('cleanImgs', gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));
gulp.task('build-images-dev', gulp.series('cleanImgs', gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));

gulp.task('build', gulp.series('clean', 'build-images', 'build-styles'));
gulp.task('build-dev', gulp.series('clean', 'build-images-dev', 'build-styles-dev'));

