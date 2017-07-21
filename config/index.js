let wiredep = require('wiredep');

module.exports = function () {

    let srcJS = "private/js",
        dstJS = "public/js",
        dstTemplates = "templates",
        dstAll = "public",
        dstImgs = "public/imgs",
        bowerJSFiles = srcJS + "/bower_components/**/*.js",
        commonJSFiles = dstJS + "/commonCustom/!(*.config)+(.js)",
        customJSFiles = dstJS + "/**/custom/*.js",
        mainJSFiles = dstJS + "/**/*.js",
        testFiles = "tests/**/*.spec.js",
        reports = "reports",
        config = {
        "app"   : {
            "port"              : 3000,
            "port_browser_sync" : 3001,
            "log_dir"           : "logs",
            "debugOnProd"       : false,
            "debugOnDev"        : false,
            "dstTemplates"      : dstTemplates,
            "dstAll"            : dstAll,
            "dstImgs"           : dstImgs
        },
        "gulp"  : {
            "packages"            : [ "./package.json", "private/js/bower.json" ],
            "srcJS"               : srcJS,
            "dstJS"               : dstJS,
            "srcCSS"              : "private/css",
            "dstCSS"              : "public/css",
            "srcImgs"             : "private/imgs",
            "dstImgs"             : dstImgs,
            "srcAll"              : "private",
            "dstAll"              : dstAll,
            "srcTemplates"        : "templates-private",
            "dstTemplates"        : dstTemplates,
            "dstRevisionManifest" : "private/manifest",
            "nodemon"             : {
                "script"   : "bin/www.js",
                "env"      : {
                    "NODE_PATH" : "."
                },
                "delay"    : 2,
                "nodeArgs" : [ "--debug" ],
                "watch"    : [ "bin/*.js", "app.js" ]
            },
            "requireJSconfig"     : srcJS + '/commonCustom/requirejs.config.js'
        },
        "karma" : getKarmaConfig()
    }

    return config;

    function getKarmaConfig () {

        let karmaFiles = [
            { pattern : bowerJSFiles, included  : false },
            { pattern : commonJSFiles, included : false },
            { pattern : customJSFiles, included : false },
            mainJSFiles,
            testFiles
        ],
        options = {
            frameworks       : [ "jasmine", "requirejs" ],
            files            : karmaFiles,
            reporters        : [ "progress", "coverage"],
            coverageReporter : {
                dir       : reports + "/coverage",
                reporters : [
                    { type : 'html', subdir : 'report-html' },
                    { type : 'lcov', subdir : 'report-lcov' },
                    { type : 'text-summary' }
                ]
            },
            preprocessors    : {},
            port             : 9876,

        }
        options.preprocessors[dstJS + "/**/!bower_components/*.js"] = [ 'coverage' ];
        return options;

    }

}