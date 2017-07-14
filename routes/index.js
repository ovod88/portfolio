module.exports = function (app) {

    app.get('/', require('./principale').get);

}
