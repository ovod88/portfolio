let path = require('path'),
    config = require('../../config')(),
    configGulp = config.gulp,
    fs = require('fs'),
    cheerio = require('cheerio');

module.exports = (req, res, next) => {

    console.log('HERE');

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
        $ = cheerio.load(htmlProject);

        $('body').append(htmlMenu);
        $('head').append(htmlCssMenu);

        res.send($.html());

    }

};
