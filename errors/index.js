const path = require('path'),
      http = require('http');

class HttpError extends Error {
    constructor(status, message) {

        super(arguments);
        Error.captureStackTrace(this, HttpError);

        this.status = typeof status === 'number' ? status : 500;
        if (message) {

            this.message = typeof message === 'string' ? message : http.STATUS_CODES[status];

        } else {

            this.message = http.STATUS_CODES[status] || "Error occured inside the application";

        }

    }

}

HttpError.prototype.name = "HttpError";

exports.HttpError = HttpError;