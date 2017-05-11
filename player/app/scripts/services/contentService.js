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

            // This function is used to save time spend on project.
            function getHierarchy(req) {
                var url = playerConstants.URL.BASE + playerConstants.URL.COURSE.HIERARCHY + '/' + req.courseId;
                return httpService.getOperation(url, req);
            }
            
            return{
                getHierarchy: getHierarchy
            };

        });