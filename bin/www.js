const app = require('../app'),
      debug = require('debug')('portfolio:server'),
      http = require('http'),
      config = require('config'),
      logger = require('logger')(module);

let port = normalizePort(process.env.PORT || config.get('port'));
app.set('port', port);

let server = http.createServer(app);

let emit = server.emit;
server.emit = function(event) {//array function can not be used with apply (this is ignored)
  logger.debug(event);
  emit.apply(server, arguments);
}

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val = 3000) {
  let port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}

function onError(error) {
  logger.crit(`Server stopped dur to ${error}`);
  if (error.syscall !== 'listen') {
    throw error;
  }

  let bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`;

  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error( `${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address(),
      bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  logger.info(`Listening on ${bind}`);
}
