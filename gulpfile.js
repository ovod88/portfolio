'use strict';
const gulp = require('gulp');

const fs = require('fs'),
path = require('path'),
merge = require('merge-stream'),
sprite = require('gulp.spritesmith'),
debug = require('gulp-debug');

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

// lazyTaskRequest('sprite', './gulpTasks/sprite', {
//     taskname: 'sprite',
//     srcFiles: 'private/imgs/',
//     imgDst: 'public/imgs/',
//     cssDst: 'private/css/sass/'
// });


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}

gulp.task('sprite', function() {
    var folders = getFolders('private/imgs');
    
    var tasks = folders.map(function(folder) {

        let spriteData = gulp.src(path.join('private/imgs', folder, '/**/*.png'))
                             .pipe(debug({title: `Compilation`}))
                             .pipe(sprite({
                                    imgName: 'icons.png',
                                    cssName: '_sprite-icons.scss',
                                    cssFormat: 'scss',
                                    algorithm: 'binary-tree',
                                    padding: 1,
                                    cssVarMap: function(sprite) {
                                        var temparray = sprite.name.split('-');

                                        if(temparray[1] == 'blue') {
                                            sprite.name = temparray[0] + ':hover';
                                        } else {
                                            sprite.name = temparray[0];
                                        }
                                    },
                                    cssOpts: {
                                        cssSelector: function (sprite) {
                                            return '#' + sprite.name;
                                        }
                                    }
                            }));

        spriteData.img.pipe(gulp.dest('public/imgs/' + folder));
        spriteData.css.pipe(gulp.dest('private/css/sass/' + folder));

        return spriteData;
    })

    return merge(tasks);
});

lazyTaskRequest('compress-imgs', './tasks/makeImgProd', {
    taskname: 'make-img-prod',
    srcFiles: 'img/src/**/*.{png,jpeg,jpg}',
    dstFolder: 'img/dist'
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

gulp.task('build-images', gulp.series('cleanImgs', 'sprite', 'copyfavicon'));
gulp.task('build-images-dev', gulp.series('cleanImgs', 'sprite', 'copyfavicon'));

gulp.task('build', gulp.series('clean', 'build-images', 'build-styles'));
gulp.task('build-dev', gulp.series('clean', 'build-images-dev', 'build-styles-dev'));

