const del = require('del');

module.exports = function (options) {

    return function (cb) {

        return del(options.dst, cb);

    }

};