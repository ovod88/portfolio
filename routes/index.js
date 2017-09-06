module.exports = function (app) {

    app.locals.styles = null;

    app.use('/projects/:project', require('./projects'));

    app.get('/', require('./principale').get);

    app.get('/about', require('./about'));

};
