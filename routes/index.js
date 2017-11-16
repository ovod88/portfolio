HttpError = require('errors').HttpError;

module.exports = function (app) {

    app.locals.styles = null;

    app.use('/projects/:projectfolder/:project', require('./projects'));

    app.get('/', require('./principale').get);

    app.get('/about', require('./about'));

    app.get('/contact', require('./contact').get);
    app.post('/contact/hire', require('./contact').post);

    app.get('/works', (req, res) => {

        let err = new HttpError(404, 'Page is under construction...');
        err.styles = require('./getFiles')('css/error');

        res.sendHttpError(err);

    });

};
