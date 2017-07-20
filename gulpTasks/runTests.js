const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    return gulp.series([ 'process-js' ], function (done) {

            startKarma(options.singleRun, done);

        })

};

function startKarma (singleRun, done) {

    let karma = require('karma').server,
        excludeFiles = [];

    karma.start({
        config    : __dirname + '/karma.config.js',
        exclude   : excludeFiles,
        singleRun : !!singleRun
    }, karmaCompleted);

    function karmaCompleted (result) {

        if (result == 1) {

            done('Karma tests ended with errors');

        } else {

            done();

        }

    }

};