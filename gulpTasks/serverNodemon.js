const $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return function (callback) {

        let started = false;

        return $.nodemon(options)
            .on('start', function () {

                if (!started) {

                    started = true;
                    callback();

                }

            })

    }

};