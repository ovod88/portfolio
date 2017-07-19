'use strict';
const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      browserSync = require('browser-sync').create(),
      configApp = require('./config').get('app'),
      configGulp = require('./config').get('gulp');

function lazyTaskRequest ( taskName, path, options ) {

    options = options || {};
    options.taskName = taskName;
    gulp.task(taskName, function (callback) {

        let task = require(path).call(this, options);

        return task(callback);

    })

}

lazyTaskRequest('copyfavicon', './gulpTasks/copy', {
    taskname : 'copyfavicon',
    src      : configGulp.srcImgs + '/favicon.ico',
    dst      : configGulp.dstImgs
});

lazyTaskRequest('copytemplates', './gulpTasks/copy', {
    taskname : 'copytemplates',
    src      : configGulp.srcTemplates + '/**/*.*',
    dst      : configGulp.dstTemplates
});

lazyTaskRequest('cleanJS', './gulpTasks/del', {
    dst : configGulp.dstJS
});

lazyTaskRequest('cleanCSS', './gulpTasks/del', {
    dst : [ configGulp.dstCSS, configGulp.srcCSS + '/**/style' ]
});

lazyTaskRequest('cleanImgs', './gulpTasks/del', {
    dst : configGulp.dstImgs
});

lazyTaskRequest('clean', './gulpTasks/del', {
    dst : [ configGulp.dstAll, configGulp.dstTemplates ]
});

lazyTaskRequest('sass', './gulpTasks/sass', {
    src : configGulp.srcCSS  + '/**/sass/*.*',
    dst : configGulp.srcCSS
});

lazyTaskRequest('concat-autopref-css', './gulpTasks/concatCSS', {
    src     : [ configGulp.srcCSS + '/fonts/*.css', configGulp.srcCSS  + '/**/libs/*.css',
                                            configGulp.srcCSS  + '/**/style/*.css' ],
    dstName : 'style.css',
    dst     : configGulp.dstCSS
});

lazyTaskRequest('copy-css', './gulpTasks/copyCSS', {
    src      : [ configGulp.srcCSS  + '/**/*.css' ],
    taskName : 'copy-css',
    dst      : configGulp.dstCSS
});

lazyTaskRequest('minify-css', './gulpTasks/minifyCSS', {
    src : configGulp.dstCSS + '/**/style.css',
    dst : configGulp.dstCSS
});

lazyTaskRequest('revCSS', './gulpTasks/rev', {
    src         : configGulp.dstCSS + '/**/*.css',
    dst         : configGulp.dstCSS,
    name        : 'css',
    dstManifest : configGulp.dstRevisionManifest
});

lazyTaskRequest('revJs', './gulpTasks/rev', {
    src         : configGulp.dstJS + '/**/main.js',
    dst         : configGulp.dstJS,
    name        : 'js',
    dstManifest : configGulp.dstRevisionManifest
});

lazyTaskRequest('revImgs', './gulpTasks/rev', {
    src         : [ configGulp.dstImgs + '/**/*.{png,jpg}' ],
    dst         : configGulp.dstImgs,
    name        : 'imgs',
    dstManifest : configGulp.dstRevisionManifest
});

lazyTaskRequest('revReplaceJS', './gulpTasks/revReplace', {
    src         : [ configGulp.srcTemplates + '/**/*.ejs' ],
    dst         : configGulp.dstTemplates,
    srcManifest : configGulp.dstRevisionManifest + '/js.json'
});

lazyTaskRequest('revReplaceImgsInCSS', './gulpTasks/revReplace', {
    src         : [ configGulp.dstCSS + '/**/*.css' ],
    dst         : configGulp.dstCSS,
    srcManifest : configGulp.dstRevisionManifest + '/imgs.json'
});

gulp.task('revision', gulp.series('revCSS', 'revJs', 'revImgs', 'revReplaceJS', 'revReplaceImgsInCSS'));

lazyTaskRequest('sprite', './gulpTasks/sprite', {
    src    : configGulp.srcImgs,
    dstImg : configGulp.dstImgs + '/',
    dstCss : configGulp.srcCSS  + '/'
});

lazyTaskRequest('compress-imgs', './gulpTasks/compressImgs', {
    taskname : 'compress-imgs',
    src      : configGulp.srcImgs + '/**/pics/*.{png,jpeg,jpg}',
    dst      : configGulp.dstImgs
});

lazyTaskRequest('lint', './gulpTasks/lintJS', {
    src : [ configGulp.srcJS + '/**/*.js', '!' + configGulp.srcJS + '/**/bower_components/**/*.*' ]
});

lazyTaskRequest('jscs', './gulpTasks/jscsJS', {
    src : [ configGulp.srcJS + '/**/*.js', '!' + configGulp.srcJS + '/**/bower_components/**/*.*' ]
});

lazyTaskRequest('babel', './gulpTasks/babelJS', {
    src  : configGulp.srcJS + '/**/*.js',
    base : configGulp.srcAll,
    dst  : configGulp.dstAll
});

lazyTaskRequest('prepare-main-file', './gulpTasks/prependJS', {
    srcFiles           : [ configGulp.dstJS + '/**/main.js', '!' + configGulp.dstJS + '/**/bower_components/**/*.*' ],
    requireConfig      : configGulp.requireJSconfig,
    dst                : configGulp.dstJS
});

lazyTaskRequest('js-optimize', './gulpTasks/jsOptimize', {
    src : configGulp.dstJS + '/**/main.js',
    dst : configGulp.dstJS,
});

gulp.task('watchjs',function () {

    gulp.watch([ configGulp.srcJS + '/**/main.js',
                 configGulp.srcJS + '/**/custom/*.js' ], gulp.series('process-js'));

});

gulp.task('watchcss',function () {

    gulp.watch(configGulp.srcCSS + '/**/sass/*.*', gulp.series('sass', 'copy-css'));

});

lazyTaskRequest('server', './gulpTasks/serverNodemon', {
    script    : configGulp.nodemon.script,
    delay     : configGulp.nodemon.delay,
    env       : configGulp.nodemon.env,
    nodeArgs  : configGulp.nodemon.nodeArgs,
    watch     : configGulp.nodemon.watch
});

gulp.task('browser-sync', gulp.series( 'server' , function () {

    browserSync.init({
        port  : configApp.port_browser_sync,
        proxy : 'localhost:' + configApp.port
    });

    browserSync.watch([ configGulp.dstAll, configGulp.dstTemplates ]).on('change', browserSync.reload);

}));

gulp.task('process-js', gulp.series('cleanJS', 'lint', 'jscs', 'babel', 'prepare-main-file'));
gulp.task('build-js', gulp.series('cleanJS', 'process-js', 'js-optimize'));
gulp.task('build-js-dev', gulp.series('cleanJS', 'process-js'));

gulp.task('build-styles', gulp.series('cleanCSS', 'sass', 'concat-autopref-css', 'minify-css'));
gulp.task('build-styles-without-minify', gulp.series('cleanCSS', 'sass', 'concat-autopref-css'));
gulp.task('build-styles-dev', gulp.series('cleanCSS', 'sass', 'copy-css'));

gulp.task('build-images', gulp.series('cleanImgs', gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));
gulp.task('build-images-dev', gulp.series('cleanImgs',
                                gulp.parallel('sprite', 'copyfavicon', 'compress-imgs')));

gulp.task('build', gulp.series('clean', 'build-images', gulp.parallel('build-styles', 'build-js'), 'revision',
                                                'server'));
gulp.task('build-dev', gulp.series('clean', 'build-images-dev',
                                            gulp.parallel('build-styles-dev', 'build-js-dev'), 'copytemplates',
                                            gulp.parallel('watchjs', 'watchcss', 'browser-sync')));

