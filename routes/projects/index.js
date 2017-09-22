let path = require('path'),
    config = require('../../config')(),
    configGulp = config.gulp;

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

        html = fs.readFileSync(path.join(options.root, fileName), 'utf8');

        res.sendFile(fileName, options, function (err) {

            if (err) {

                next(err);

            } else {

                next();

            }

        });

    }

};
