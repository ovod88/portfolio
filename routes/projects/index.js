let path = require('path'),
    config = require('../../config')(),
    configGulp = config.gulp,
    fs = require('fs'),
    cheerio = require('cheerio'),
    HttpError = require('errors').HttpError,
    async = require('async'),
    loadedProjects = [];

if (!global.errStyles) {

    require('../getFiles')('css/error', function (e, data) {

        if (e) {

            global.errStyles = [];

        }
        global.errStyles = data;

    });

}

function prepareProject (rootDir, callback) {

    let project = loadedProjects[rootDir];

    if (project) {

        callback(null, project);

    } else {

        let fileName = 'index.html',
        htmlProject,
        htmlMenu,
        htmlCssMenu = '<link rel="stylesheet" href="../../menu-to-all.css">',
        htmlFontsAwesome = "<link rel='stylesheet prefetch'" +
                            "href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>",
        $;

        async.parallel([
            function (cb) {

                fs.readFile(path.join(rootDir, fileName), 'utf8', (err, data) => {

                    if (err) {

                        cb(err);

                    }
                    htmlProject = data.toString();
                    cb();

                });

            }, function (cb) {

                fs.readFile(path.join(__dirname, '../../', configGulp.dstProjects, 'menu-to-all.html' ), 'utf8',
                                                                        (err, data) => {

                    if (err) {

                        cb(err);

                    }
                    htmlMenu = data.toString();
                    cb();

                });

            }
        ], function (e) {

            if (e) {

                let err = new HttpError(404, e.message);
                err.style = global.errStyles;
                callback(err);

            } else {

                $ = cheerio.load(htmlProject);

                $('body').append(htmlMenu);
                $('head').append(htmlCssMenu);
                $('head').append(htmlFontsAwesome);

                loadedProjects[rootDir] = $.html();
                callback(null, $.html());

            }

        });

    }

}

module.exports = (req, res, next) => {

    if ( req.params.project ) {

        let options = {
                root     : path.join( __dirname, '../../', configGulp.dstProjects,
                                            req.params.projectfolder, req.params.project ),
                dotfiles : 'deny',
                headers  : {
                    'x-timestamp' : Date.now(),
                    'x-sent'      : true
                }
            };

        prepareProject(options.root, function (err, project) {

            if (err) {

                res.sendHttpError(err);
                res.end();

            }
            res.send(project);

        });

    }

};
