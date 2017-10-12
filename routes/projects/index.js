let path = require('path'),
    config = require('../../config')(),
    configGulp = config.gulp,
    fs = require('fs'),
    cheerio = require('cheerio');

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
        htmlProject = fs.readFileSync(path.join(options.root, fileName), 'utf8'),
        htmlMenu = fs.readFileSync(path.join(__dirname, '../../', configGulp.dstProjects, 'menu-to-all.html' ), 'utf8'),
        htmlCssMenu = '<link rel="stylesheet" href="../../menu-to-all.css">',
        htmlFontsAwesome = "<link rel='stylesheet prefetch'" +
                                    "href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>",
        $ = cheerio.load(htmlProject);

        $('body').append(htmlMenu);
        $('head').append(htmlCssMenu);
        $('head').append(htmlFontsAwesome);

        res.send($.html());

    }

};
