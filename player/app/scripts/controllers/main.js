'use strict';

/**
 * @ngdoc function
 * @name playerApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the playerApp
 */
angular.module('playerApp')
  .controller('MainCtrl', function (contentService, $log) {
    var vm = this;
    vm.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    var req = {
      "request": {
        "filters": {

          "name": "Test Content with ekStep_utils"
        }
      },
      "params": {
        "cid": "12"
      }
    }

    // vm.name = "Anuj";

    contentService.getSearchContent(req).then(function (res) {
      console.log(res);
      if (res.responseCode === "OK") {
        vm.data = res.result;
        console.log(res.result);
      }
    }), function (errorMessage) {
      $log.warn(errorMessage);
    };

    //     vm.data = [
    //   {
    //     "id": 1,
    //     "title": "node1",
    //     "nodes": [
    //       {
    //         "id": 11,
    //         "title": "node1.1",
    //         "nodes": [
    //           {
    //             "id": 111,
    //             "title": "node1.1.1",
    //             "nodes": []
    //           }
    //         ]
    //       },
    //       {
    //         "id": 12,
    //         "title": "node1.2",
    //         "nodes": []
    //       }
    //     ]
    //   },
    //   {
    //     "id": 2,
    //     "title": "node2",
    //     "nodrop": true,
    //     "nodes": [
    //       {
    //         "id": 21,
    //         "title": "node2.1",
    //         "nodes": []
    //       },
    //       {
    //         "id": 22,
    //         "title": "node2.2",
    //         "nodes": []
    //       }
    //     ]
    //   },
    //   {
    //     "id": 3,
    //     "title": "node3",
    //     "nodes": [
    //       {
    //         "id": 31,
    //         "title": "node3.1",
    //         "nodes": []
    //       }
    //     ]
    //   }
    // ];

  });
