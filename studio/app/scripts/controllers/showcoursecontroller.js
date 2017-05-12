'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:ShowCourseCtrl
 * @description
 * # ShowCourseCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('ShowCourseCtrl', function (courseService, $log, $scope, contentService) {
            var vm = this;
            var reqForHierarchy = {
                courseId: courseService.getCourseId()
            };
            console.log(courseService.getCourseId());

            courseService.getHierarchy(reqForHierarchy).then(function (res) {
                if (res.responseCode === "OK") {
                    vm.data = res.result.content;
                }
            }), function (errorMessage) {
                $log.warn(errorMessage);
            };

            vm.remove = function (scope) {
                scope.remove();
            };

            vm.toggle = function (scope) {
                scope.toggle();
            };

            vm.moveLastToTheBeginning = function () {
                var a = vm.data.pop();
                vm.data.splice(0, 0, a);
            };

            vm.newSubItem = function (scope) {
                $scope.showSearchTemplate = true;

                vm.addScope = scope;
                var request = {
                    filters: {},
                    limit : 30
                };
                $scope.contentList = 0;
                contentService.search(request).then(function (response) {
                    if (response.responseCode === "OK" && response.result.count > 0) {
                        $scope.contentList = response.result.content;
                    } else {
                        $scope.showNoContentFound = true;
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };

            $scope.getContent = function (query) {
                
                var request = {
                    filters: {},
                    query : query
                };  
                $scope.contentList = 0;
                contentService.search(request).then(function (response) {
                    if (response.responseCode === "OK" && response.result.count > 0) {
                        $scope.contentList = response.result.content;
                    } else {
                        $scope.showNoContentFound = true;
                    }
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };
            
            $scope.addContent = function(data) {
                
                var nodeData = vm.addScope.$modelValue;
//                data.id = nodeData.id * 10 + nodeData.children.length;
                data.children = [];
                console.log(nodeData);
                console.log(data);
                nodeData.children.push(data);
            };

            $scope.loadRating = function () {
                $('.ui.rating')
                        .rating({
                            maxRating: 5
                        })
                        .rating("disable", true);
            };
        });
