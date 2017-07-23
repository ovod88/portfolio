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

    let excludeFiles = [],
        KarmaServer = new karma.Server({
            configFile     : path.normalize(__dirname +'/../karma.conf.js'),
            exclude        : excludeFiles,
            singleRun      : !!singleRun,
            captureTimeout : 60000
        }, karmaCompleted).start();

    function karmaCompleted () {

        done();

    }

};