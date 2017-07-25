var tests = [],
    modules = [],
    TEST_REGEXP = /spec\.js$/,
    // MODULE_REGEXP = /^((?!bower_components).)*$/,
    MODULE_REGEXP = /commonCustom\//,
    JS_REGEXP = /\.js$/;

// Normalize a path to RequireJS module name.
var pathToModule = function(path) {
    return path.replace(/\.js$/, '').replace(/^\/base\// , '');
};

Object.keys(window.__karma__.files).forEach(function (file) {
    if (TEST_REGEXP.test(file)) {
        tests.push(file);
    } else if (MODULE_REGEXP.test(file) && JS_REGEXP.test(file)) {
        modules.push((file));
    }
});

console.log(modules);
console.log(tests);

// var startTest = function () {
//     //loading all the existing requirejs src modules before
//     //triggering the karma test
//     require(modules, function () { 
//         window.__karma__.start();
//     });
// };

require.config({

  baseUrl: '/base/public/js',

  // Example of using shim to load non AMD libraries (such as Backbone, jquery).
//   shim: {
//     'legacy-library': {
//       deps: [],
//       exports: 'global'
//     }
//   },

  paths       : {
      "jquery"      : "bower_components/jquery/dist/jquery",
      "testcommon"  : "commonCustom/testcommon",
      
  },

  // Dynamically require all test files.
  deps: tests,
  callback: window.__karma__.start,
  waitSeconds: 20
});

