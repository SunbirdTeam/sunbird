'use strict';

describe('Filter: contentFilter', function () {

  // load the filter's module
  beforeEach(module('studioApp'));

  // initialize a new instance of the filter before each test
  var contentFilter;
  beforeEach(inject(function ($filter) {
    contentFilter = $filter('contentFilter');
  }));

  it('should return the input prefixed with "contentFilter filter:"', function () {
    var text = 'angularjs';
    expect(contentFilter(text)).toBe('contentFilter filter: ' + text);
  });

});
