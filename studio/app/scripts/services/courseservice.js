'use strict';

/**
 * @ngdoc service
 * @name studioApp.courseService
 * @description
 * # courseService
 * Service in the studioApp.
 */
angular.module('studioApp')
        .service('courseService', function (httpService, studioConstant) {

            // This function is used to save time spend on project.
            function getHierarchy(req) {
                var url = studioConstant.URL.BASE + studioConstant.URL.COURSE.HIERARCHY + '/' + req.courseId;
                return httpService.getOperation(url, req);
            }

            function getMyCourse(req) {
                var url = studioConstant.URL.BASE + studioConstant.URL.COURSE.GET_MY_COURSE + '/' + req.createdBy;
                return httpService.getOperation(url, req);
            }
            
            function searchCourse(req) {
                var url = studioConstant.URL.BASE + studioConstant.URL.COURSE.SEARCH;
                return httpService.postOperation(url, req);
            }
            
            return{
                getHierarchy: getHierarchy,
                getMyCourse: getMyCourse,
                searchCourse: searchCourse
            };

        });
