'use strict';

/**
 * @ngdoc service
 * @name playerApp.contentService
 * @description
 * # contentService
 * Service in the playerApp.
 */
angular.module('playerApp')
        .service('contentService', function (httpService, playerConstants) {
            
            function getSearchContent(req){
                var url = playerConstants.URL.BASE + playerConstants.URL.CONTENT.SEARCH;
                return httpService.postOperation(url, req);
            }
            
            return{
                getSearchContent:getSearchContent
            };

        });