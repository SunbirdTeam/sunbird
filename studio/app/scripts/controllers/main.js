'use strict';

/**
 * @ngdoc function
 * @name studioApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the studioApp
 */
angular.module('studioApp')
        .controller('MainCtrl', function (courseService, $log) {
            var vm = this;
            vm.awesomeThings = [
                'HTML5 Boilerplate',
                'AngularJS',
                'Karma'
            ];

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
//        getLevelMenu(scope.$modelValue.level, "remove");
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
//            vm.data = {};
//            vm.data.name = "Course name"
//
//            vm.data.children = [
//                {
//                    "id": 1,
//                    "name": "node1",
//                    "children": [
//                        {
//                            "id": 11,
//                            "name": "node1.1",
//                            "children": [
//                                {
//                                    "id": 111,
//                                    "name": "node1.1.1",
//                                    "children": []
//                                }
//                            ]
//                        },
//                        {
//                            "id": 12,
//                            "name": "node1.2",
//                            "children": []
//                        }
//                    ]
//                },
//                {
//                    "id": 2,
//                    "name": "node2",
//                    "nodrop": true,
//                    "children": [
//                        {
//                            "id": 21,
//                            "name": "node2.1",
//                            "children": []
//                        },
//                        {
//                            "id": 22,
//                            "name": "node2.2",
//                            "children": []
//                        }
//                    ]
//                },
//                {
//                    "id": 3,
//                    "name": "node3",
//                    "children": [
//                        {
//                            "id": 31,
//                            "name": "node3.1",
//                            "children": []
//                        }
//                    ]
//                }
//            ];

        });

