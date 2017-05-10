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

            vm.name = "Anuj";

//            courseService.getHierarchy(req).then(function (res) {
//                if (res.responseCode === "OK") {
//                    vm.data = res.result;
//                    console.log(res.result);
//                }
//            }), function (errorMessage) {
//                $log.warn(errorMessage);
//            };

    vm.data = [
  {
    "id": 1,
    "title": "node1",
    "nodes": [
      {
        "id": 11,
        "title": "node1.1",
        "nodes": [
          {
            "id": 111,
            "title": "node1.1.1",
            "nodes": []
          }
        ]
      },
      {
        "id": 12,
        "title": "node1.2",
        "nodes": []
      }
    ]
  },
  {
    "id": 2,
    "title": "node2",
    "nodrop": true,
    "nodes": [
      {
        "id": 21,
        "title": "node2.1",
        "nodes": []
      },
      {
        "id": 22,
        "title": "node2.2",
        "nodes": []
      }
    ]
  },
  {
    "id": 3,
    "title": "node3",
    "nodes": [
      {
        "id": 31,
        "title": "node3.1",
        "nodes": []
      }
    ]
  }
];

        });

