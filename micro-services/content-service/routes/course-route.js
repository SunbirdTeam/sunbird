/**
 * file: course-route.js
 * author: Anuj Gupta
 * desc: route file for course
 */ 

var courseService           = require('../service/courseService');

var BASE_URL_V1             = "/api/sb/v1/course";

module.exports = function(app) {
    
    app.route(BASE_URL_V1 + '/search')
        .post(courseService.searchCourse);

    app.route(BASE_URL_V1 + '/create')
        .post(courseService.createCourseAPI);

    app.route(BASE_URL_V1 + '/update')
        .post(courseService.updateCourse);

    app.route(BASE_URL_V1 + '/review')
        .post(courseService.reviewCourse);

    app.route(BASE_URL_V1 + '/publish')
        .post(courseService.publishCourse);

    app.route(BASE_URL_V1 + 'toc')
        .get(courseService.getAllTOC);

    app.route(BASE_URL_V1 + '/toc/id')
        .post(courseService.getMyTOC);
};