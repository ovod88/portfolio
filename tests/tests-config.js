var tests = [],
    modules = [],
    TEST_REGEXP = /spec\.js$/,
    MODULE_REGEXP = /^((?!bower_components|node_modules|tests).)*$/,
    JS_REGEXP = /\.js$/,
    pathToModule = function (path) {

        return path.replace(/\.js$/, '').replace(/^\/base\// , '');

    };

Object.keys(window.__karma__.files).forEach(function (file) {

    if (TEST_REGEXP.test(file)) {

        tests.push(file);

    } else if (MODULE_REGEXP.test(file) && JS_REGEXP.test(file)) {

        modules.push((file));

    }

});

var startTest = function () {

    require([], function () {

        window.__karma__.start();

    });

};

require.config({
    baseUrl     : '/base/public/js',
    paths       : {
        "jquery"      : "bower_components/jquery/dist/jquery",
        "testcommon"  : "commonCustom/testcommon"
    },
    deps        : tests,
    callback    : window.__karma__.start,
    waitSeconds : 20
});

