const gulp = require('gulp'),
      $ = require('gulp-load-plugins')();

module.exports = function (options) {

    let manifests = options.srcManifests;

    return function () {

        let stream = gulp.src(options.src);

        for( let i = 0; i < manifests.length; i++ ) {

            stream = stream
                        .pipe(
                            $.revReplace({
                                replaceInExtensions : [ '.js', '.css', '.html', '.hbs','.ejs' ],
                                manifest            : gulp.src(manifests[i])
                            })
                        )
                        .pipe($.debug({ 'title' : $.util.colors.yellow('Revision replacing...') }));

        }
        return stream.pipe(gulp.dest(options.dst));

    };

};