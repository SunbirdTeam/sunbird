'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('CourseCtrl', function ($location, courseService, $log, $scope, $state) {

            var vm = this;

            vm.addCourse = function () {
                $state.go("addCourse");
            };

            vm.getCurrentCourse = function () {
                var request = {
                    filters: {
                        createdBy: "123456",
                        status: ["Live"]
                    }
                };
                vm.currentCourseList = 0;
                courseService.searchCourse(request).then(function (response) {
                    if (response.responseCode === "OK" && response.result.count > 0) {
                        vm.currentCourseList = response.result.course;
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };

            vm.getDraftCourse = function () {

                var request = {
                    filters: {
                        createdBy: "123456",
                        status: ["Draft"]
                    }
                };

                vm.draftCourseLists = 0;
                courseService.searchCourse(request).then(function (response) {
                    if (response.responseCode === "OK" && response.result.count > 0) {
                        vm.draftCourseList = response.result.course;
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };

//            vm.showCourse = function (courseId) {
//                courseService.setCourseId(courseId);
//                $state.go('showCourse')
//            };
        });
