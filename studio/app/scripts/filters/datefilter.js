'use strict';

/**
 * @ngdoc filter
 * @name studioApp.filter:dateFilter
 * @function
 * @description
 * # dateFilter
 * Filter in the studioApp.
 */
angular.module('studioApp')
  .filter('dateFilter', function () {
    return function (date) {
      return moment(date).format("MMMM Do YYYY");
    };
  });
