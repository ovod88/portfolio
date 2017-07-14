const logger = require('logger')(module);

module.exports = (req, res, next) => {

    res.sendHttpError = function (err) {

        res.status(err.status || 500);

        if (req.app.get('env') == 'development') {

            logger.error(`Sending error stack to the client...`);
            res.setHeader('Content-Type', 'text/plain');
            res.send(err.stack);

        } else {

            logger.error(`Sending error page to the client...`);
            res.render('error');

        }

    }

    next();

}