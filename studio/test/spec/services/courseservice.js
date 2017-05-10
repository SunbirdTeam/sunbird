'use strict';

describe('Service: courseService', function () {

  // load the service's module
  beforeEach(module('studioApp'));

  // instantiate service
  var courseService;
  beforeEach(inject(function (_courseService_) {
    courseService = _courseService_;
  }));

  it('should do something', function () {
    expect(!!courseService).toBe(true);
  });

});
