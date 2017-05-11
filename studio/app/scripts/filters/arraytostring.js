'use strict';

/**
 * @ngdoc filter
 * @name studioApp.filter:arrayToString
 * @function
 * @description
 * # arrayToString
 * Filter in the studioApp.
 */
angular.module('studioApp')
  .filter('arrayToString', function () {
    return function (input) {
      return 'arrayToString filter: ' + input;
    };
  });
