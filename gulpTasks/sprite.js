const gulp = require('gulp'),
      debug = require('gulp-debug'),
      sprite = require('gulp.spritesmith');

module.exports = function(options) {
    return function () {
        let spriteData = gulp.src(options.srcFiles, {since: gulp.lastRun(options.taskname)})
                             .pipe(debug({title: `${options.taskname} compilation`}))
                             .pipe(sprite({
                                    imgName: 'icons.png',
                                    imgPath: 'public/imgs/',
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

        spriteData.img.pipe(gulp.dest(options.imgDst));
        spriteData.css.pipe(gulp.dest(options.cssDst));

        return spriteData;
    }
};
