const gulp = require('gulp'),
      debug = require('gulp-debug'),
      sprite = require('gulp.spritesmith'),
      fs = require('fs'),
      path = require('path'),
      merge = require('merge-stream');


function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory();
      });
}


module.exports = function(options) {
    return function() {
        var folders = getFolders(options.src);
    
        var tasks = folders.map(function(folder) {

            let spriteData = gulp.src(path.join(options.src, folder, '/**/*.png'))
                                .pipe(debug({title: `Sprite compilation`}))
                                .pipe(sprite({
                                        imgName: 'icons.png',
                                        imgPath: '../../imgs/' + folder + '/icons.png',
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

            spriteData.img.pipe(gulp.dest(options.dstImg + folder));
            spriteData.css.pipe(gulp.dest(options.dstCss + folder));

            return spriteData;
        })

        return merge(tasks);
    }
}