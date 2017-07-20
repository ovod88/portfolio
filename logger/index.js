let winston = require('winston'),
    env = process.env.NODE_ENV || 'development',
    path = require('path'),
    config = require('config')(),
    configApp = config.app,
    logDir = configApp.log_dir,
    isDevelopment = (env === 'development'),
    isDebugModeProdOn = configApp.debugOnProd,
    isDebugModeDevOn = configApp.debugOnDev;

const tsFormat = () => (new Date()).toLocaleTimeString();

function getLogger (module) {

    let fullPath = module.filename.split(path.sep).slice(-2).join(path.sep),
        transports = [
                new (require('winston-daily-rotate-file'))({
                    name             : 'all-to-file',
                    filename         : `${logDir}/-all-results.log`,
                    timestamp        : tsFormat,
                    datePattern      : 'yyyy-MM-dd',
                    prepend          : true,
                    handleExceptions : true,
                    json             : true,
                    maxsize          : 5242880,
                    maxFiles         : 5,
                    level            : isDevelopment ? 'debug' : (isDebugModeProdOn ? 'debug' : 'info'),
                    label            : fullPath
                }),
                new (require('winston-daily-rotate-file'))({
                    name             : 'warn-to-file',
                    filename         : `${logDir}/-warn-results.log`,
                    timestamp        : tsFormat,
                    handleExceptions : true,
                    json             : true,
                    maxsize          : 5242880,
                    maxFiles         : 5,
                    datePattern      : 'yyyy-MM-dd',
                    prepend          : true,
                    level            : 'warning',
                    label            : fullPath
                })
            ];

    if (isDevelopment) {

        transports.push(
            new (winston.transports.Console)({
                timestamp        : tsFormat,
                colorize         : true,
                json             : true,
                handleExceptions : true,
                level            : isDebugModeDevOn ? 'debug' : 'info',
                label            : fullPath
            })
        )

    }

    let logger =  new (winston.Logger)({
        transports
    });

    logger.setLevels(winston.config.syslog.levels);

    return logger;

}

module.exports = getLogger;