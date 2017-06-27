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
    src: 'private/css/sass/core.scss',
    base: 'private/css/sass',
    dst: 'public/css'
});

lazyTaskRequest('sprite', './tasks/sprite', {
    taskname: 'sprite',
    srcFiles: ['img/dist/icons/*.*', '!img/dist/icons/icons.png'],
    imgDst: 'img/dist/icons/',
    cssDst: 'css/src/'
});

lazyTaskRequest('compress-imgs', './tasks/makeImgProd', {
    taskname: 'make-img-prod',
    srcFiles: 'img/src/**/*.{png,jpeg,jpg}',
    dstFolder: 'img/dist'
});

gulp.task('watch',function() {
    gulp.watch('private/css/**/*.*', gulp.series('sass'));//TODO ADD JS
});

// lazyTaskRequest('concatCSS', './gulpTasks/concatCSS', {
//     src: ['private/css/core.css'],
//     dstName: 'style.css',
//     dst: 'public/css'
// });

// gulp.task('build-js-prod', gulp.series());//TODO
// gulp.task('build-js-dev', gulp.series());//TODO

gulp.task('build-styles', gulp.series('cleanCSS', 'sass'));//TODO
gulp.task('build-styles-dev', gulp.series('cleanCSS', 'sass', 'watch'));

// gulp.task('build-images', gulp.series());//TODO

// gulp.task('build', gulp.series());//TODO

