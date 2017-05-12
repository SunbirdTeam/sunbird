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
    'ui.tree',
    'ui.router'
  ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
//      .state('login', {
//        url: '/',
//        templateUrl: 'app/login/login.html',
//        controller: 'LoginController',
//        controllerAs: 'login'
//      })
      .state('course', {
        url: '/course',
        templateUrl: 'views/course/courses.html',
        controller: 'CourseCtrl',
        controllerAs: 'courses'
      })
      .state('addCourse', {
        url: '/course/add',
        templateUrl: 'views/course/create.html',
        controller: 'CreateCourseCtrl',
        controllerAs: 'createCourse'
      })
      .state('showCourse', {
        url: "course/show",
        templateUrl: 'views/course/show.html',
        controller: 'ShowCourseCtrl',
        controllerAs: 'showCourse'
      });
      $urlRouterProvider.otherwise('/course');
  });
