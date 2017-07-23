var tests = [];
var TEST_REGEXP = /spec\.js$/;

// Normalize a path to RequireJS module name.
// var pathToModule = function(path) {
//   return path.replace(/^\/base\//, '').replace(/\.js$/, '');
// };

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    tests.push(file);
  }
});

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
  callback: window.__karma__.start
});

