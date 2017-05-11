'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:CourseCtrl
 * @description
 * # CourseCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('CourseCtrl', function (courseService, $log, $scope, contentService) {
            var vm = this;
            var req = {
                courseId: "do_11219206596520345611"
            };
            vm.name = "Content";

            courseService.getHierarchy(req).then(function (res) {
                if (res.responseCode === "OK") {
                    vm.data = res.result.content;
                    console.log(res.result);
                }
            }), function (errorMessage) {
                $log.warn(errorMessage);
            };

            vm.collapseAll = function () {
                vm.$broadcast('angular-ui-tree:collapse-all');
            };

            vm.expandAll = function () {
                vm.$broadcast('angular-ui-tree:expand-all');
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
                var nodeData = scope.$modelValue;
                nodeData.children.push({
                    id: nodeData.id * 10 + nodeData.children.length,
                    name: nodeData.oldtitle + '.' + (nodeData.children.length + 1),
                    children: []
                });
            };

            vm.request = {
                filters: {}
            };

            $scope.getContent = function (query) {

                vm.request.query = query;
                contentService.search(vm.request).then(function (response) {
                    $scope.activitiesList = response.result.content;
                    loadRating();
                }), function (errorMessage) {
                    $log.warn(errorMessage);
                };
            };

            function loadRating() {
                $('.ui.rating')
                        .rating({
                            maxRating: 5
                        })
                        .rating("disable", true);
            };
        });
