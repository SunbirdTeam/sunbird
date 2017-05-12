'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:ShowAllCourseCtrl
 * @description
 * # ShowAllCourseCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('ShowAllCourseCtrl', function ($location, courseService, $log, $scope) {

            var vm = this;

            vm.addCourse = function () {
                $location.path("/addCourse");
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
                        console.log("Live Course", response);
//                        $scope.safeApply(function () {
                            vm.currentCourseList = response.result.course;
//                        });
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
                        console.log("Draft Course", response);
//                        $scope.safeApply(function () {
                            vm.draftCourseList = response.result.course;
//                        });
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };
            
            vm.showCourse = function(courseId) {
                
                console.log(courseId);
            };
        });
