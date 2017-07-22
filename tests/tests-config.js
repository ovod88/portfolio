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
  // Karma serves files under `/base`,
  // which is the `basePath` from your config file.
  baseUrl: '/base',

  // Example of using shim to load non AMD libraries (such as Backbone, jquery).
//   shim: {
//     'legacy-library': {
//       deps: [],
//       exports: 'global'
//     }
//   },

  // Dynamically require all test files.
  deps: tests,

  // We have to kickoff testing framework,
  // after RequireJS is done with loading all the files.
  callback: window.__karma__.start
});

