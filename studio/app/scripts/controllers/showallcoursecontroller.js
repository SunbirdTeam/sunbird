'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:ShowAllCourseCtrl
 * @description
 * # ShowAllCourseCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('ShowAllCourseCtrl', function ($location) {
            
            var vm = this;
            
            vm.addCourse = function() {
                $location.path("/addCourse")
            }

        });
