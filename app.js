const express = require('express'),
      app = express(),
      path = require('path'),
      HttpError = require('errors').HttpError,
      logger = require('logger')(module),
      loggerM = require('morgan');
      favicon = require('serve-favicon'),
      bodyParser = require('body-parser'),
      cookieParser = require('cookie-parser');


app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

if(app.get('env') == 'development') {
  app.use(loggerM('dev'));
} else {
  app.use(loggerM('default'));
}

app.use(favicon(path.join(__dirname, 'public/imgs', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// app.use(require('node-sass-middleware')({
//   src: path.join(__dirname, 'public'),
//   dest: path.join(__dirname, 'public'),
//   indentedSyntax: true,
//   sourceMap: true
// }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/hello', (req, res) => {
  console.log(req.query);
  res.send(`Hello`);
});

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
     res.render('error');//TODO
  }
}


module.exports = app;
