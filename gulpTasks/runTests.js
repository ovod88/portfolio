const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path');

module.exports = function (options) {

    return gulp.series([ 'process-js' ], function (done) {

            startKarma(options.singleRun, done);

        })

};

function startKarma (singleRun, done) {

    let KarmaServer = require('karma').Server,
        excludeFiles = [];

    new KarmaServer({
        configFile     : path.normalize(__dirname +'/../karma.conf.js'),
        exclude        : excludeFiles,
        singleRun      : !!singleRun,
        captureTimeout : 60000
    }, karmaCompleted).start();

    function karmaCompleted (result) {

        if (result == 1) {

            done('Karma tests ended with errors');

        } else {

            done();

        }

    }

};