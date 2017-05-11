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
        templateUrl: 'views/course/showAll.html',
        controller: 'ShowAllCourseCtrl',
        controllerAs: 'showAllCourse'
      })
      .when('/addCourse', {
        templateUrl: 'views/course/create.html',
        controller: 'CreateCourseCtrl',
        controllerAs: 'createCourse'
      })
      .when('/updateCourse', {
        templateUrl: 'views/course/update.html',
        controller: 'CourseCtrl',
        controllerAs: 'course'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
