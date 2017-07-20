module.exports = function () {

    let srcJS = "private/js",
        dstTemplates = "templates",
        dstAll = "public",
        dstImgs = "public/imgs",
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
            "dstJS"               : "public/js",
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
        "karma" : {
            "frameworks" : [ "jasmine", "requirejs" ]
        }
    }

    return config;

}