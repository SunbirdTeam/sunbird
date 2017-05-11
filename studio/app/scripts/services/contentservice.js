'use strict';

/**
 * @ngdoc service
 * @name studioApp.contentService
 * @description
 * # contentService
 * Service in the studioApp.
 */
angular.module('studioApp')
        .service('contentService', function (httpService, studioConstant) {

            // This function is used to save time spend on project.
            function search(req) {
                var url = studioConstant.URL.BASE + studioConstant.URL.CONTENT.SEARCH;
                return httpService.postOperation(url, req);
            }

            return{
                search: search
            };

        });
