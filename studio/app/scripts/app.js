'use strict';

/**
 * @ngdoc overview
 * @name studioApp
 * @description
 * # studioApp
 *
 * Main module of the application.
 */
angular
  .module('studioApp', [
    'ngCookies',
    'ngRoute',
    'ui.tree'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
