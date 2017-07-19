const nconf = require('nconf'),
    path = require('path');

nconf.argv()
   .env()
   .file({ file : path.join(__dirname, 'config.json') });

nconf.set("gulp:requireJSconfig", nconf.get("gulp:srcJS") + '/commonCustom/requirejs.config.js')

module.exports = nconf;