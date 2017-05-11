'use strict';

describe('Controller: CreateCourseCtrl', function () {

  // load the controller's module
  beforeEach(module('studioApp'));

  var CreateCourseCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateCourseCtrl = $controller('CreateCourseCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateCourseCtrl.awesomeThings.length).toBe(3);
  });
});
