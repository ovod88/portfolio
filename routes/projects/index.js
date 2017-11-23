let path = require('path'),
    config = require('../../config')(),
    configGulp = config.gulp,
    fs = require('fs'),
    cheerio = require('cheerio'),
    HttpError = require('errors').HttpError,
    async = require('async');

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
            },
            fileName = 'index.html',
            htmlProject,
            htmlMenu,
            htmlCssMenu = '<link rel="stylesheet" href="../../menu-to-all.css">',
            htmlFontsAwesome = "<link rel='stylesheet prefetch'" +
                               "href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>",
            $;

        async.parallel([
            function (cb) {

                fs.readFile(path.join(options.root, fileName), 'utf8', (err, data) => {

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
                require('./getFiles')('css/error', function(e, data) {
                    err.styles = data;
                    res.sendHttpError(err);
                    res.end();
                });

            } else {

                $ = cheerio.load(htmlProject);

                $('body').append(htmlMenu);
                $('head').append(htmlCssMenu);
                $('head').append(htmlFontsAwesome);

                res.send($.html());
            }

        });

    }

};
