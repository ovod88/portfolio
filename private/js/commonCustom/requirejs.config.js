requirejs.config ({
    baseUrl     : '../js',
    waitSeconds : 200,
    paths       : {
        "jquery"          : "../bower_components/jquery/dist/jquery",
        "testcommon"      : "commonCustom/testcommon",
        "Modernizr"       : "libs/modernizr-custom",
        "settings"        : "commonCustom/settings",
        "mediaQueryClass" : "commonCustom/mediaQueryClass",
        "sassToJs"        : "../bower_components/sass-to-js/js/dist/sass-to-js.min"
    },
    shim        : {
        "Modernizr" : {
            exports : "Modernizr"
        },
        "sassToJs"  : {
            exports : "sassToJs"
        }
    }
});

