'use strict';

describe('Service: httpService', function () {

  // load the service's module
  beforeEach(module('studioApp'));

  // instantiate service
  var httpService;
  beforeEach(inject(function (_httpService_) {
    httpService = _httpService_;
  }));

  xit('should do something', function () {
    expect(!!httpService).toBe(true);
  });

});
