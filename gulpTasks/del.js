const del = require('del'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function (cb) {

        $.util.log($.util.colors.yellow('Cleaning all files in ... ' + options.dst));
        return del(options.dst, cb);

    }

};