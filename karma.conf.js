module.exports = function (config) {

    let configKarma = require('./config').get('karma');

    config.set({
        basePath   : '',
        frameworks : configKarma.frameworks,
        files      : configKarma.
    });

};