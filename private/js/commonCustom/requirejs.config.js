requirejs.config ({
    baseUrl     : '../js',
    waitSeconds : 200,
    paths       : {
        "jquery"          : "../bower_components/jquery/dist/jquery",
        'jqueryeasing'    : "libs/jquery.easing",
        "testcommon"      : "commonCustom/testcommon",
        "Modernizr"       : "libs/modernizr-custom",
        "settings"        : "commonCustom/settings",
        "mediaQueryClass" : "commonCustom/mediaQueryClass",
        "resizeFunc"      : "commonCustom/resizeFunc",
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

