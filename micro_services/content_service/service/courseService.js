/**
 * @name : courseService.js
 * @description :: Responsible for handle course service
 * @author      :: Anuj Gupta
 */

var async = require('async');
var randomString = require('randomstring');
var ekStepUtil = require('sb-ekstep-util');
var respUtil = require('response_util');
//var LOG = require('sb_logger_util').logger;
var configUtil = require('sb-config-util');
var validatorUtil = require('sb_req_validator_util');
var courseModel = require('../models/courseModel').COURSE;
var messageUtils = require('./messageUtil');

var courseMessage = messageUtils.COURSE;
var responseCode = messageUtils.RESPONSE_CODE;


/**
 * This function help to transform the object body with oldKey and newKey
 * @param {Object} body
 * @param {String} oldKey
 * @param {String} newKey
 * @returns {nm$_courseService.transformReqBody.ekStepData}
 */
function transformReqBody(body, oldKey, newKey) {
    var ekStepData = {
        request: {}
    };
    for (var key in body) {
        if (key === oldKey) {
            ekStepData.request[newKey] = body[oldKey];
            return ekStepData;
        }
    }
}

/**
 * This function help to transform the object body with oldKey and newKey
 * @param {Object} body
 * @param {String} oldKey
 * @param {String} newKey
 * @returns {nm$_courseService.transformReqBody.ekStepData}
 */
function transformResBody(body, oldKey, newKey) {
    var ekStepData = body;
    for (var key in body) {
        if (key === oldKey) {
            ekStepData[newKey] = body[oldKey];
            delete ekStepData[oldKey];
            return ekStepData;
        }
    }
}

/**
 * This function helps to generate code for create content
 * @returns {String}
 */
function getCode() {
    return configUtil.getConfig('PREFIX_CODE') + randomString.generate(6);
}

/**
 * This function return the mimeType for create course
 * @returns {String}
 */
function getMimeTypeForCourse() {
    return configUtil.getConfig('MIME_TYPE_FOR_COURSE');
}

/**
 * This function return the contentType for create course
 * @returns {String}
 */
function getContentTypeForCourse() {
    return configUtil.getConfig('CONTENT_TYPE_FOR_COURSE');
}

/**
 * this function helps to search course using ekstep api
 * @param {object} req
 * @param {object} response
 * @returns {Object} object with error or success response with http status code
 */
function searchCourseAPI(req, response) {

    var data = req.body;
    var rspObj = req.rspObj;

    if (!data.request || !data.request.filters) {
        rspObj.errCode = courseMessage.SEARCH.MISSING_CODE;
        rspObj.errMsg = courseMessage.SEARCH.MISSING_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));
    }

    data.request.filters.contentType = getContentTypeForCourse();
    var ekStepData = { request: data.request };

    async.waterfall([

        function(CBW) {
            ekStepUtil.searchContent(ekStepData, function(err, res) {

                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.SEARCH.FAILED_CODE;
                    rspObj.errMsg = courseMessage.SEARCH.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = transformResBody(res.result, 'content', 'course');
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * this function helps to create course using ekstep api
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function createCourseAPI(req, response) {

    var data = req.body;
    var rspObj = req.rspObj;

    if (!data.request || !data.request.course || !validatorUtil.validate(data.request.course, courseModel.CREATE)) {
        //prepare
        rspObj.errCode = courseMessage.CREATE.MISSING_CODE;
        rspObj.errMsg = courseMessage.CREATE.MISSING_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));
    }

    //Tranform request for Ekstep
    data.request.course.code = getCode();
    data.request.course.mimeType = getMimeTypeForCourse();
    data.request.course.contentType = getContentTypeForCourse();

    var ekStepData = transformReqBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            ekStepUtil.createContent(ekStepData, function(err, res) {
                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.CREATE.MISSING_CODE;
                    rspObj.errMsg = courseMessage.CREATE.MISSING_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },
        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return response.status(200).send(respUtil.successResponse(rspObj));
        }

    ]);
}

/**
 * this function helps to update course using ekstep api
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function updateCourseAPI(req, response) {

    var data = req.body;
    data.contentId = req.params.contentId;

    var rspObj = req.rspObj;

    if (!data.request || !data.request.course || !validatorUtil.validate(data.request.course, courseModel.UPDATE)) {
        rspObj.errCode = courseMessage.UPDATE.MISSING_CODE;
        rspObj.errMsg = courseMessage.UPDATE.MISSING_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));
    }

    //Tranform request for Ekstep
    delete data.request.course['mimeType'];
    delete data.request.course['contentType'];

    var ekStepData = transformReqBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            ekStepUtil.updateContent(ekStepData, data.contentId, function(err, res) {
                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.UPDATE.FAILED_CODE;
                    rspObj.errMsg = courseMessage.UPDATE.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * this function helps to review course using ekstep api
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function reviewCourseAPI(req, response) {

    var data = {
        body: req.body
    };
    var rspObj = req.rspObj;

    data.contentId = req.params.contentId;
    var ekStepData = { request: data.request };

    async.waterfall([

        function(CBW) {
            ekStepUtil.reviewContent(ekStepData, data.contentId, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.REVIEW.FAILED_CODE;
                    rspObj.errMsg = courseMessage.REVIEW.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * this function helps to publish course using ekstep api
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function publishCourseAPI(req, response) {

    var data = {};
    data.contentId = req.params.contentId;

    var rspObj = req.rspObj;

    async.waterfall([

        function(CBW) {
            ekStepUtil.publishContent(data.contentId, function(err, res) {
                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.PUBLISH.FAILED_CODE;
                    rspObj.errMsg = courseMessage.PUBLISH.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            rspObj.result.publishStatus = res.result.publishStatus;
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * this function helps to get course of user
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function getCourseAPI(req, response) {

    var data = {};
    var rspObj = req.rspObj;

    data.body = req.body;
    data.contentId = req.params.contentId;

    if (!data.contentId) {
        rspObj.errCode = courseMessage.GET.FAILED_CODE;
        rspObj.errMsg = courseMessage.GET.FAILED_MESSAGE;
        rspObj.responseCode = responseCode.CLIENT_ERROR;
        response.status(400).send(respUtil.errorResponse(rspObj));
    }

    async.waterfall([

        function(CBW) {
            ekStepUtil.getContent(data.contentId, function(err, res) {
                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.GET.FAILED_CODE;
                    rspObj.errMsg = courseMessage.GET.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = transformResBody(res.result, 'content', 'course');
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * this function helps to get course of user
 * @param {Object} req
 * @param {Object} response
 * @returns {Object} object with error or success response with http status code
 */
function getMyCourseAPI(req, response) {

    var request = {
        "filters": {
            // "createdBy": req.userId  
            "createdBy": req.params.createdBy,
            "contentType": getContentTypeForCourse()
        }

    };
    req.body.request = request;
    var ekStepData = { request: request };
    var rspObj = req.rspObj;

    async.waterfall([

        function(CBW) {
            ekStepUtil.searchContent(ekStepData, function(err, res) {

                if (err || res.responseCode !== responseCode.SUCCESS) {
                    rspObj.errCode = courseMessage.GET_MY.FAILED_CODE;
                    rspObj.errMsg = courseMessage.GET_MY.FAILED_MESSAGE;
                    rspObj.responseCode = res.responseCode;
                    var httpStatus = (res.responseCode === responseCode.RESOURSE_NOT_FOUND) ? 404 : 400;
                    return response.status(httpStatus).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = transformResBody(res.result, 'content', 'course');
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}


module.exports.searchCourseAPI = searchCourseAPI;
module.exports.createCourseAPI = createCourseAPI;
module.exports.updateCourseAPI = updateCourseAPI;
module.exports.reviewCourseAPI = reviewCourseAPI;
module.exports.publishCourseAPI = publishCourseAPI;
module.exports.getCourseAPI = getCourseAPI;
module.exports.getMyCourseAPI = getMyCourseAPI;
