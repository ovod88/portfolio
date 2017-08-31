let path = require('path'),
    config = require('./config')(),
        configGulp = config.gulp;

module.exports = (req, res, next) => {

    let options = {
        root     : path.join( __dirname, '../../', dstProjects, req.params.project ),
        dotfiles : 'deny',
        headers  : {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    if ( req.params.project === 'tennis' ) {

        var fileName = 'index.html';
        res.sendFile(fileName, options, function (err) {

            if (err) {

                next(err);

            } else {

                next();

        }

    });

    }

};
