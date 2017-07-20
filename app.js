const express = require('express'),
      app = express(),
      path = require('path'),
      HttpError = require('errors').HttpError,
      logger = require('logger')(module),
      loggerM = require('morgan'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser'),
      config = require('./config')(),
      configApp = config.app;

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, configApp.dstTemplates));
app.set('view engine', 'ejs');

if (app.get('env') == 'development') {

    app.use(loggerM('dev'));

} else {

    app.use(loggerM('default'));

}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

app.use(require('middleware/sendHttpError'));

//app.use(require('node-sass-middleware')({
//src: path.join(__dirname, 'public'),
//dest: path.join(__dirname, 'public'),
//indentedSyntax: true,
//sourceMap: true
//}));

app.use(express.static(path.join(__dirname, configApp.dstAll)));

app.get('/hello', (req, res) => {

    console.log(req.query);
    res.send(`Hello`);

});

app.get('/favicon.ico', (req, res) => {

    res.setHeader('Cache-Control', 'public, max-age=604800');
    res.sendFile(path.join(__dirname, configApp.dstImgs, 'favicon.ico'));

})

app.post('/hello', (req, res) => {

    console.log(req.body);
    res.json(req.body);

});

require("routes")(app);

app.use((req, res, next) => {

    let err = new HttpError(404);
    next(err);

});

app.use((err, req, res, next) => {

    if (typeof err === 'number') {

        err = new HttpError(err);

    }
    logger.error(`Request to ${req.url} caused error status ${err.status} with message ${err.stack}`);

    if (!(err instanceof HttpError)) {

        err = new HttpError(err.message);

    }

    res.sendHttpError(err);
    //res.locals.message = err.message;
    //res.locals.error = req.app.get('env') === 'development' ? err : {};
    //res.render('error');

});

module.exports = app;
