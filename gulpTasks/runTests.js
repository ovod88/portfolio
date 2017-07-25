const gulp = require('gulp'),
      $ = require('gulp-load-plugins')(),
      path = require('path'),
      karma = require('karma');

module.exports = function (options) {

    return gulp.series(options.deps, function (done) {

            startKarma(options.singleRun, done);

        });

};

function startKarma (singleRun, done) {

    let KarmaServer = new karma.Server({
            configFile     : path.normalize(__dirname +'/../karma.conf.js'),
            singleRun      : !!singleRun,
            captureTimeout : 20000
        }, karmaCompleted);

    function karmaCompleted (result) {

        if (result == 1) {

            done('Karma ended with error');

        } else {

            done();

        }

    }

    KarmaServer.start();

};