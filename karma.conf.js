module.exports = function (config) {

    let conf = require('./config')(),
        configKarma = conf.karma;

    config.set({
        basePath         : '',
        frameworks       : configKarma.frameworks,
        browsers         : configKarma.browsers,
        files            : configKarma.files,
        reporters        : configKarma.reporters,
        preprocessors    : configKarma.preprocessors,
        coverageReporter : configKarma.coverageReporter,
        notifyReporter   : configKarma.notifyReporter,
        port             : configKarma.port,
        colors           : true,
        loglevel         : config.LOG_INFO
    });

};