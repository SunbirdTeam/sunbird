'use strict';

/**
 * @ngdoc filter
 * @name studioApp.filter:contentFilter
 * @function
 * @description
 * # contentFilter
 * Filter in the studioApp.
 */
angular.module('studioApp')
  .filter('contentFilter', function () {
    return function (input) {
      return 'contentFilter filter: ' + input;
    };
  });
