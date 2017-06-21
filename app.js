const express = require('express'),
      app = express(),
      path = require('path'),
      HttpError = require('errors').HttpError,
      logger = require('logger')(module);

// var favicon = require('serve-favicon');
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
// var bodyParser = require('body-parser');

// var index = require('./routes/index');
// var users = require('./routes/users');

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true,
//   sourceMap: true
// }));
// app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.send(`Hello`));

// app.use('/users', users);

app.use((req, res, next) => {
  let err = new HttpError(404);
  next(err);
});

app.use((err, req, res, next) => {
  if(typeof err === 'number') {
    err = new HttpError(err);
  }
  logger.error(`Request to ${req.url} caused error status ${err.status} with message ${err.stack}`);

  if(err instanceof HttpError) {
    sendError(err, res);
  } else {
    err = new HttpError(err.message);
    sendError(err, res);
  }
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};
  // res.render('error');
});

let sendError = (err, res) => {
  if(app.get('env') == 'development') {
     res.status(err.status || 500);
     res.setHeader('Content-Type', 'text/plain');
     res.send(err.stack);
  } else {
     res.send('HERE WILL BE BEAUTIFUL ERROR PAGE FOR USERS WITH TEMPLATE');//TODO
  }
}


module.exports = app;
