/**
 * @name : courseService.js
 * @description :: Responsible for handle course service
 * @author      :: Anuj Gupta
 */

var async = require('async');
var randomString = require('randomstring');
var ekStepUtils = require('sb-ekstep-util');
var respUtil = require('./responseUtil.js');
var courseUtil = require('./messageUtil').COURSE;
var LOG = require('sb_logger_util').logger;

function transformReqResBody(body, oldKey, newKey) {
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

function checkRequiredKey(body, value) {

    return value.every(function(val) {
        return val in body;
    });
}

function getCode() {
    return 'org.sunbird.' + randomString.generate(6);
}

function getMimeTypeForCourse() {
    return "application/vnd.ekstep.content-collection";
}

function getContentTypeForCourse() {
    return "Collection";
}

/**
 * Wrapper function to search function
 * @param {object} req
 * @param {object} response
 */
function searchCourseAPI(req, response) {

    var data = req.body;

    var rspObj = {
        id: respUtil.API_ID.COURSE_SEARCH,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.filters) {
        rspObj.errCode = courseUtil.SEARCH.MISSING_CODE;
        rspObj.errMsg = courseUtil.SEARCH.MISSING_MESSAGE;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));
    }

    data.request.filters.contentType = getContentTypeForCourse();

    async.waterfall([

        function(CBW) {
            ekStepUtils.searchContent(data, function(err, res) {

                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.SEARCH.FAILED_CODE;
                    rspObj.errMsg = courseUtil.SEARCH.FAILED_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = res.result;
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * wrapper function for create course
 * @param {type} req
 * @param {type} response
 * @returns {undefined}
 */
function createCourseAPI(req, response) {

    var data = req.body;

    var rspObj = {
        id: respUtil.API_ID.COURSE_CREATE,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.course || !checkRequiredKey(data.request.course, ['name', 'description'])) {
        rspObj.errCode = courseUtil.CREATE.MISSING_CODE;
        rspObj.errMsg = courseUtil.CREATE.MISSING_MESSAGE;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));

    }

    //Tranform request for Ekstep
    data.request.course.code = getCode();
    data.request.course.mimeType = getMimeTypeForCourse();
    data.request.course.contentType = getContentTypeForCourse();

    var ekStepData = transformReqResBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            ekStepUtils.createContent(ekStepData, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.CREATE.MISSING_CODE;
                    rspObj.errMsg = courseUtil.CREATE.MISSING_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
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


function updateCourseAPI(req, response) {

    var data = req.body;
    data.contentId = req.params.contentId;

    var rspObj = {
        id: respUtil.API_ID.COURSE_UPDATE,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.course || !checkRequiredKey(data.request.course, ['versionKey'])) {
        rspObj.errCode = courseUtil.ERROR_CODE.ERR_COURSE_UPDATE_FIELDS_MISSING;
        rspObj.errMsg = courseUtil.ERROR_MESSAGE.ERR_COURSE_UPDATE_FIELDS_MISSING;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return response.status(400).send(respUtil.errorResponse(rspObj));
    }

    //Tranform request for Ekstep
    delete data.request.course['mimeType'];
    delete data.request.course['contentType'];

    var ekStepData = transformReqResBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            ekStepUtils.updateContent(ekStepData, data.contentId, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.ERROR_CODE.ERR_COURSE_UPDATE_FAILED;
                    rspObj.errMsg = courseUtil.ERROR_MESSAGE.ERR_COURSE_UPDATE_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
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

function reviewCourseAPI(req, response) {

    var data = {
        body: req.body
    };
    data.contentId = req.params.contentId;
    data.apiId = respUtil.API_ID.COURSE_REVIEW;

    var rspObj = {
        id: data.apiId,
        msgId: null,
        result: {}
    };

    async.waterfall([

        function(CBW) {
            ekStepUtils.reviewContent(data.body, data.contentId, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.REVIEW.FAILED_CODE;
                    rspObj.errMsg = courseUtil.REVIEW.FAILED_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
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


function publishCourseAPI(req, response) {

    var data = {};
    data.contentId = req.params.contentId;

    var rspObj = {
        id: respUtil.API_ID.COURSE_PUBLISH,
        msgId: null,
        result: {}
    };

    async.waterfall([

        function(CBW) {
            ekStepUtils.publishContent(data.contentId, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.PUBLISH.FAILED_CODE;
                    rspObj.errMsg = courseUtil.PUBLISH.FAILED_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
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

function getCourseAPI(req, response) {

    var data = {};
    data.contentId = req.params.contentId;
    data.apiId = respUtil.API_ID.COURSE_GET_ALL;

    var rspObj = {
        id: data.apiId,
        msgId: null,
        result: {}
    };
    async.waterfall([

        function(CBW) {
            ekStepUtils.getContent(data.contentId, function(err, res) {
                //After check response, we perform other operation
                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.GET.FAILED_CODE;
                    rspObj.errMsg = courseUtil.GET.FAILED_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    response.status(400).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = transformReqResBody(res.result, 'content', 'course');
            return response.status(200).send(respUtil.successResponse(rspObj));
        }
    ]);
}

function getMyCourseAPI(req, response) {

    var data = {
        "request": {
            "filters": {
                // "createdBy": req.userId  
                "createdBy": req.body.createdBy,
                "contentType":  getContentTypeForCourse()
            }
        }
    };
    
    var rspObj = {
        id: respUtil.API_ID.COURSE_GET_MY,
        msgId: null,
        result: {}
    };

    async.waterfall([

        function(CBW) {
            ekStepUtils.searchContent(data, function(err, res) {

                if (err || res.responseCode !== respUtil.RESPONSE_CODE.SUCCESS) {
                    rspObj.errCode = courseUtil.GET_MY.FAILED_CODE;
                    rspObj.errMsg = courseUtil.GET_MY.FAILED_MESSAGE;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return response.status(400).send(respUtil.errorResponse(rspObj));
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = res.result;
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
