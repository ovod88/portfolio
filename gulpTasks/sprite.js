const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      fs = require('fs'),
      path = require('path'),
      merge = require('merge-stream');

function getFolders (dir) {

    return fs.readdirSync(dir)
      .filter(function (file) {

            return fs.statSync(path.join(dir, file)).isDirectory();

        });

}

module.exports = function (options) {

    return function () {

        let folders = getFolders(options.src),
        tasks = folders.map(function (folder) {

            let spriteData = gulp.src(path.join(options.src, folder, '/icons/*.*'))
                                .pipe($.plumber({
                                    errorHandler : $.notify.onError(function (err) {

                                        return {
                                            title   : $.util.colors.red('Sprite compilation'),
                                            message : err.message
                                        };

                                    })
                                }))
                                .pipe($.debug({ title : $.util.colors.yellow(`Sprite compilation`) }))
                                .pipe($.spritesmith({
                                        imgName   : 'icons/icons.png',
                                        imgPath   : '../../../imgs/' + folder + '/icons/icons.png',
                                        cssName   : 'sass/' + '_sprite-icons.scss',
                                        cssFormat : 'scss',
                                        algorithm : 'binary-tree',
                                        padding   : 1,
                                        cssVarMap : function (sprite) {

                                            var temparray = sprite.name.split('-');

                                            if (temparray[1] == 'color') {

                                                sprite.name = temparray[0] + ':hover';

                                            } else {

                                                sprite.name = temparray[0];

                                            }

                                        },
                                        cssOpts   : {
                                            cssSelector : function (sprite) {

                                                return '#' + sprite.name;

                                            }
                                        }

                                    }));

            spriteData.img.pipe(gulp.dest(options.dstImg + folder));
            spriteData.css.pipe(gulp.dest(options.dstCss + folder));

            return spriteData;

        })

        return merge(tasks);

    }

}