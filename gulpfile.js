'use strict';
const gulp = require('gulp'),
      browserSync = require('browser-sync').create(),
      config = require('./config');

function lazyTaskRequest(taskName, path, options) {
    options = options || {};
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
    dst: ['public/css', 'private/css/**/style']
});

lazyTaskRequest('cleanImgs', './gulpTasks/del', {
    dst: 'public/imgs'
});

lazyTaskRequest('clean', './gulpTasks/del', {
    dst: ['public', 'private/manifest']
});

lazyTaskRequest('sass', './gulpTasks/sass', {
    src: 'private/css/**/sass/*.*',
    dst: 'private/css'
});

lazyTaskRequest('concat-autopref-css', './gulpTasks/concatCSS', {
    src: ['private/css/fonts/*.css', 'private/css/**/libs/*.css', 'private/css/**/style/*.css'],
    dstName: 'style.css',
    dst: 'public/css'
});

lazyTaskRequest('copy-css', './gulpTasks/copyCSS', {
    src: ['private/css/**/*.css'],
    taskName: 'copy-css',
    dst: 'public/css'
});

lazyTaskRequest('minify-css', './gulpTasks/minifyCSS', {
    src: 'public/css/**/style.css',
    dst: 'public/css'
});

lazyTaskRequest('revCSS', './gulpTasks/rev', {
    src: 'public/css/**/*.css',
    dst: 'public/css',
    name: 'css',
    dstManifest: 'private/manifest'
});

lazyTaskRequest('revJs', './gulpTasks/rev', {
    src: 'public/js/**/main.js',
    dst: 'public/js',
    name: 'js',
    dstManifest: 'private/manifest'
});

lazyTaskRequest('revImgs', './gulpTasks/rev', {
    src: ['public/imgs/**/*.{png,jpg}'],
    dst: 'public/imgs',
    name: 'imgs',
    dstManifest: 'private/manifest'
});

gulp.task('revision', gulp.series('revCSS', 'revJs', 'revImgs'));

lazyTaskRequest('rev-collect', './gulpTasks/revCollect', {
    src: ['private/manifest/*.json','templates/*.ejs', 'public/css/**/*.css'],
});

lazyTaskRequest('sprite', './gulpTasks/sprite', {
    src: 'private/imgs',
    dstImg: 'public/imgs/',
    dstCss: 'private/css/'
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

gulp.task('build-js', gulp.series('cleanJS', 'lint', 'babel', 'js-optimize'));
gulp.task('build-js-dev', gulp.series('cleanJS', 'lint', 'babel'));

gulp.task('build-styles', gulp.series('cleanCSS', 'sass', 'concat-autopref-css', 'minify-css'));
gulp.task('build-styles-without-minify', gulp.series('cleanCSS', 'sass', 'concat-autopref-css'));
gulp.task('build-styles-dev', gulp.series('cleanCSS', 'sass', 'copy-css'));

gulp.task('build-images', gulp.series('cleanImgs', gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));
gulp.task('build-images-dev', gulp.series('cleanImgs', 
                                gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));

gulp.task('build', gulp.series('clean', 'build-images', gulp.parallel('build-styles', 'build-js')));
gulp.task('build-dev', gulp.series('clean', 'build-images-dev', 
                                            gulp.parallel('build-styles-dev', 'build-js-dev'), 
                                            gulp.parallel('watchjs', 'watchcss', 'browser-sync')));

