let HttpError = require('errors').HttpError;

if (!global.errStyles) {

    require('./getFiles')('css/error', function (e, data) {

        if (e) {

            global.errStyles = [];

        }
        global.errStyles = data;

    });

}

module.exports = function (app) {

    app.locals.styles = null;

    app.use('/projects/:projectfolder/:project', require('./projects'));

    app.get('/', require('./principale').get);

    app.get('/about', require('./about'));

    app.get('/contact', require('./contact').get);
    app.post('/contact/hire', require('./contact').post);

    app.get('/works', (req, res) => {

        let err = new HttpError(404, 'Page is under construction...');

        err.styles = global.errStyles;
        res.sendHttpError(err);

    });

};
