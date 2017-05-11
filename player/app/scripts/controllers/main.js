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

    contentService.getSearchContent(req).then(function (res) {
      console.log(res);
      if (res.responseCode === "OK") {
        vm.data = res.result;
        console.log(res.result);
      }
    }), function (errorMessage) {
      $log.warn(errorMessage);
    };

   
  });
