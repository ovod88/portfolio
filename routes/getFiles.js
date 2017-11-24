const fs = require('fs'),
      config = require('../config')(),
      configGulp = config.gulp,
      async = require('async'),
      path = require('path');

function getFiles (dir, ext, callback) {

    let files = [],
        filesExt = ext || [];

    fs.readdir(dir, function (err, folderContent) {

        if (err) {

            return callback(err);

        }

        var pending = folderContent.length;
        if (!pending) return callback(null, files);

        folderContent.forEach(function (file) {
            file = path.resolve(dir, file);

            fs.stat(file, function (err, stat) {

                if (stat && stat.isDirectory()) {

                    getFiles(file, [], function (err, resp) {

                        files = files.concat(resp);
                        if (!--pending) callback(null, files);

                    });

                } else {

                    let arrpath = path.relative('public', file);
                    arrpath = arrpath.split(path.sep);
                    file = arrpath.join('/');
                    files.push(file);

                    if (!--pending) callback(null, files);

                }

            });

        });

    });

}

module.exports = function (relativeStyleDir, callback) {

    let styles = [], libs = [], files;

    async.series([
        function (cb) {

            getFiles(configGulp.dstAll + '/' + relativeStyleDir, [], function (err, files) {
                if (err) {

                    return cb(null, []);

                }
                styles = files;
                files.forEach(function (name) {

                    if (name.indexOf('style') != -1) {

                        styles.customStyle = name;
                        styles.splice(styles.indexOf(name), 1);

                    }

                });

                cb(null, styles);

            });

        },
        function (cb) {

            getFiles(configGulp.dstAll + '/' + configGulp.commonCssLibs, [], function (err, files) {
                if (err) {

                    return cb(null, []);

                }
                libs = files;
                cb(null, libs);

            });

        }
    ],
        function (err, results) {

            if (err) {

                return callback(err, []);

            }
            files = [ ...libs, ...styles ];
            files.customStyle = styles.customStyle;

            callback(null, files);

        });

};