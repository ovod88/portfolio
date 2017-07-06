'use strict';
const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      config = require('./config');

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

lazyTaskRequest('lint', './gulpTasks/lintJS', {
    src: ['private/js/**/*.js', '!private/js/**/libs/**/*.*', '!private/js/**/bower_components/**/*.*']
});

lazyTaskRequest('babel', './gulpTasks/babelJS', {
    src: 'private/js/**/*.js',
    base: 'private',
    dst: 'public'
});

lazyTaskRequest('js-optimize', './gulpTasks/jsOptimize', {
    src: 'public/js/**/main.js',
    dst: 'public/js',
});

gulp.task('watchjs',function() {
    gulp.watch('private/js/**/*.*', gulp.series('babel'));
});

gulp.task('watchcss',function() {
    gulp.watch('private/css/sass/**/*.*', gulp.series('sass'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        port: config.get('port-browser-sync'),
        proxy: 'localhost:' + config.get('port')
    });

    browserSync.watch(['public', 'templates']).on('change', browserSync.reload);
});

// lazyTaskRequest('concatCSS', './gulpTasks/concatCSS', {
//     src: ['private/css/core.css'],
//     dstName: 'style.css',
//     dst: 'public/css'
// });

gulp.task('build-js', gulp.series('cleanJS', 'lint', 'babel', 'js-optimize'));
gulp.task('build-js-dev', gulp.series('cleanJS', 'lint', 'babel'));

gulp.task('build-styles', gulp.series('cleanCSS', 'sass'));
gulp.task('build-styles-dev', gulp.series('cleanCSS', 'sass'));

gulp.task('build-images', gulp.series('cleanImgs', gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));
gulp.task('build-images-dev', gulp.series('cleanImgs', 
                                gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));

gulp.task('build', gulp.series('clean', 'build-images', gulp.parallel('build-styles', 'build-js')));
gulp.task('build-dev', gulp.series('clean', 'build-images-dev', 
                                            gulp.parallel('build-styles-dev', 'build-js-dev'), 
                                            gulp.parallel('watchjs', 'watchcss', 'browser-sync')));

