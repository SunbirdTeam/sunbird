'use strict';

describe('Service: studioConstant', function () {

  // load the service's module
  beforeEach(module('studioApp'));

  // instantiate service
  var studioConstant;
  beforeEach(inject(function (_studioConstant_) {
    studioConstant = _studioConstant_;
  }));

  xit('should do something', function () {
    expect(!!studioConstant).toBe(true);
  });

});
