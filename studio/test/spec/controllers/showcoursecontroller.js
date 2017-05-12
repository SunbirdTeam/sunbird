'use strict';

describe('Controller: ShowCourseCtrl', function () {

  // load the controller's module
  beforeEach(module('studioApp'));

  var ShowCourseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ShowCourseCtrl = $controller('ShowCourseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  xit('should attach a list of awesomeThings to the scope', function () {
    expect(ShowCourseCtrl.awesomeThings.length).toBe(3);
  });
});
