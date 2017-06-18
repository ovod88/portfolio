var express = require('express');
var app = express();
var path = require('path');
var HttpError = require('errors').HttpError;

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

app.use('/',function(req, res) {
  res.send('Hello');
});

// app.use('/users', users);

app.use(function(req, res, next) {
  var err = new HttpError(404);

  next(err);


  // var err = new Error('Not Found Here');
  // err.status = 404;
  // next(err);
});

app.use(function(err, req, res, next) {





  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // res.status(err.status || 500);
  // res.render('error');
});

module.exports = app;
