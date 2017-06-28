const gulp = require('gulp'),
      debug = require('gulp-debug'),
      sprite = require('gulp.spritesmith'),
      path = require('path');


module.exports = function(options) {















    // return folders(options.srcFiles, function(folder) {


    //             // console.log(path.join(__dirname, "../" + options.srcFiles, folder, '*.png'));

    //             let spriteData = gulp.src(path.join(__dirname, "../" + options.srcFiles, folder, '*.png'), 
    //                                                                 {since: gulp.lastRun(options.taskname)})
    //                          .pipe(debug({title: `${path.join(__dirname, "../" + options.srcFiles, folder)} ${options.taskname} compilation`}))
    //                          .pipe(sprite({
    //                                 imgName: 'icons.png',
    //                                 cssName: '_sprite-icons.scss',
    //                                 cssFormat: 'scss',
    //                                 algorithm: 'binary-tree',
    //                                 padding: 1,
    //                                 cssVarMap: function(sprite) {
    //                                     var temparray = sprite.name.split('-');

    //                                     if(temparray[1] == 'blue') {
    //                                         sprite.name = temparray[0] + ':hover';
    //                                     } else {
    //                                         sprite.name = temparray[0];
    //                                     }
    //                                 },
    //                                 cssOpts: {
    //                                     cssSelector: function (sprite) {
    //                                         return '#' + sprite.name;
    //                                     }
    //                                 }
    //                         }));

    //     spriteData.img.pipe(gulp.dest(options.imgDst + folder));
    //     spriteData.css.pipe(gulp.dest(options.cssDst + folder));

    //     return spriteData;
    // });
}