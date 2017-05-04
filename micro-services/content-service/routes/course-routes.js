/**
 * file: course-route.js
 * author: Anuj Gupta
 * desc: route file for course
 */ 

var courseService           = require('../service/courseService');

var BASE_URL_V1             = "/api/sb/v1/course";

module.exports = function(app) {
    
    app.route(BASE_URL_V1 + '/search')
        .post(courseService.searchCourseAPI);

    app.route(BASE_URL_V1 + '/create')
        .post(courseService.createCourseAPI);

    app.route(BASE_URL_V1 + '/update/:contentId')
        .patch(courseService.updateCourseAPI);

    app.route(BASE_URL_V1 + '/review/:contentId')
        .post(courseService.reviewCourseAPI);

    app.route(BASE_URL_V1 + '/publish/:contentId')
        .get(courseService.publishCourseAPI);

    app.route(BASE_URL_V1 + '/toc/:contentId')
        .get(courseService.getAllTOCAPI);

    app.route(BASE_URL_V1 + '/toc')
        .post(courseService.getMyTOCAPI);
};