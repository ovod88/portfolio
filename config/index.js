const nconf = require('nconf'),
    path = require('path');

nconf.argv()
   .env()
   .file({ file : path.join(__dirname, 'config.json') });

nconf.set("gulp:requireJSconfig", nconf.get("gulp:srcJS") + '/commonCustom/requirejs.config.js');

nconf.set("app:dstTemplates", nconf.get("gulp:dstTemplates"));
nconf.set("app:dstAll", nconf.get("gulp:dstAll"));
nconf.set("app:dstImgs", nconf.get("gulp:dstImgs"));

module.exports = nconf;