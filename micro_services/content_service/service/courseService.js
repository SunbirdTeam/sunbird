var restClient = require('./restClientService');
var respUtil = require('./responseUtil.js');
var async = require('async');
var randomString = require('randomstring');

function transformRequestBody(body, oldKey, newKey) {
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

function getMimeType() {
    return "application/vnd.ekstep.content-collection";
}

function getContentType() {
    return "Collection";
}

function getApiVersion() {
    return '1.0';
}

/**
 * This function first check all the required params, and then create course in ekstep, After that we store in cache
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */
function createCourse(data, callback) {

    var rspObj = {
        id: data.apiId,
        version: data.apiVersion,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.course || !checkRequiredKey(data.request.course, ['name', 'description'])) {
        rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_REQ_FIELDS_MISSING;
        rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_REQ_FIELDS_MISSING;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return callback(respUtil.errorResponse(rspObj), null);
    }

    //Tranform request for Ekstep
    data.request.course.code = getCode();
    data.request.course.mimeType = getMimeType();
    data.request.course.contentType = getContentType();

    var ekStepData = transformRequestBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            restClient.performCreateContent(ekStepData, function(err, res) {
                //After check response, we perform other operation
                if (err) {
                    rspObj.result.messages = [];
                    rspObj.result.messages.push(err.result.messages);
                    rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_REQ_FAILED;
                    rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_REQ_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return callback(respUtil.errorResponse(rspObj), null);
                } else {
                    CBW(null, res);
                }
            });
        },
        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return callback(null, respUtil.successResponse(rspObj));
        }

    ]);
}


/**
 * Search the content from the ekstep
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */
function searchCourse(data, callback) {

    var rspObj = {
        id: data.apiId,
        version: data.apiVersion,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.filters) {
        rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_SEARCH_FIELDS_MISSING;
        rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_SEARCH_FIELDS_MISSING;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return callback(respUtil.errorResponse(rspObj), null);
    }

    async.waterfall([

        function(CBW) {
            restClient.performSearchContent(data, function(err, res) {
                if (err) {
                    rspObj.result.messages = [];
                    rspObj.result.messages.push(err.result.messages);
                    rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_SEARCH_FAILED;
                    rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_SEARCH_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return callback(respUtil.errorResponse(rspObj), null);
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result = res.result;
            return callback(null, respUtil.successResponse(rspObj));
        }
    ]);
}


/**
 * update metadata of the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function updateCourse(data, callback) {

    var rspObj = {
        id: data.apiId,
        version: data.apiVersion,
        msgId: null,
        result: {}
    };

    if (!data.request || !data.request.course || !checkRequiredKey(data.request.course, ['versionKey'])) {
        rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_UPDATE_FIELDS_MISSING;
        rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_UPDATE_FIELDS_MISSING;
        rspObj.responseCode = respUtil.RESPONSE_CODE.CLIENT_ERROR;
        return callback(respUtil.errorResponse(rspObj), null);
    }

    //Tranform request for Ekstep
    data.request.course.mimeType = getMimeType();
    data.request.course.contentType = getContentType();

    var ekStepData = transformRequestBody(data.request, 'course', 'content');

    async.waterfall([

        function(CBW) {
            restClient.performUpdateContent(ekStepData, function(err, res) {
                //After check response, we perform other operation
                if (err) {
                    rspObj.result.messages = [];
                    rspObj.result.messages.push(err.result.messages);
                    rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_UPDATE_FAILED;
                    rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_UPDATE_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return callback(respUtil.errorResponse(rspObj), null);
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return callback(null, respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * review the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function reviewCourse(data, callback) {

    var rspObj = {
        id: data.apiId,
        version: data.apiVersion,
        msgId: null,
        result: {}
    };

    async.waterfall([

        function(CBW) {
            restClient.performReviewContent(data, function(err, res) {
                //After check response, we perform other operation
                if (err) {
                    rspObj.result.messages = [];
                    rspObj.result.messages.push(err.result.messages);
                    rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_REVIEW_FAILED;
                    rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_REVIEW_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return callback(respUtil.errorResponse(rspObj), null);
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            return callback(null, respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * publish the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function publishCourse(data, callback) {

    var rspObj = {
        id: data.apiId,
        version: data.apiVersion,
        msgId: null,
        result: {}
    };

    async.waterfall([

        function(CBW) {
            restClient.performPublishContent(data, function(err, res) {
                //After check response, we perform other operation
                if (err) {
                    rspObj.result.messages = [];
                    rspObj.result.messages.push(err.result.messages);
                    rspObj.errCode = respUtil.ERROR_CODE.ERR_COURSE_PUBLISH_FAILED;
                    rspObj.errMsg = respUtil.ERROR_MESSAGE.ERR_COURSE_PUBLISH_FAILED;
                    rspObj.responseCode = respUtil.RESPONSE_CODE.SERVER_ERROR;
                    return callback(respUtil.errorResponse(rspObj), null);
                } else {
                    CBW(null, res);
                }
            });
        },

        function(res) {
            rspObj.result.course_id = res.result.node_id;
            rspObj.result.versionKey = res.result.versionKey;
            rspObj.result.publishStatus = res.result.publishStatus;
            return callback(null, respUtil.successResponse(rspObj));
        }
    ]);
}

/**
 * get All the course
 * @param {object} data
 * @param {function} callback
 * @returns {callback} with error or response
 */

function getAllTOC(data, callback) {

    restClient.performGetContent(data, function(err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}


/**
 * Wrapper function to search function
 * @param {object} req
 * @param {object} res
 */
function searchCourseAPI(req, res) {

    var data = req.body;
    data.apiId = 'sunbird.course.search';
    data.apiVersion = getApiVersion();

    searchCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

/**
 * wrapper function for create course
 * @param {type} req
 * @param {type} res
 * @returns {undefined}
 */
function createCourseAPI(req, res) {

    var data = req.body;
    data.apiId = 'sunbird.course.save';
    data.apiVersion = getApiVersion();

    createCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


function updateCourseAPI(req, res) {

    var data = req.body;
    data.contentId = req.params.contentId;
    data.apiId = 'sunbird.course.update';
    data.apiVersion = getApiVersion();

    updateCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

function reviewCourseAPI(req, res) {

    var data = {};
    data.contentId = req.params.contentId;
    data.apiId = 'sunbird.course.review';
    data.apiVersion = getApiVersion();

    reviewCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


function publishCourseAPI(req, res) {

    var data = {};
    data.contentId = req.params.contentId;
    data.apiId = 'sunbird.course.publish';
    data.apiVersion = getApiVersion();

    publishCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });

}

function getAllTOCAPI(req, res) {

    var data = {};
    data.contentId = req.params.contentId;
    data.apiId = 'sunbird.course.getAllToc';
    data.apiVersion = getApiVersion();

    getAllTOC(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}

function getMyTOCAPI(req, res) {

    var data = req.body;
    data.apiId = 'sunbird.course.getMyToc';
    data.apiVersion = getApiVersion();

    searchCourse(data, function(error, data) {

        if (error) {
            return res.send(error);
        } else {
            return res.send(data);
        }
    });
}


module.exports.searchCourseAPI = searchCourseAPI;
module.exports.createCourseAPI = createCourseAPI;
module.exports.updateCourseAPI = updateCourseAPI;
module.exports.reviewCourseAPI = reviewCourseAPI;
module.exports.publishCourseAPI = publishCourseAPI;
module.exports.getAllTOCAPI = getAllTOCAPI;
module.exports.getMyTOCAPI = getMyTOCAPI;

//fot test purpose
module.exports.createCourse = createCourse;
module.exports.searchCourse = searchCourse;
module.exports.updateCourse = updateCourse;
module.exports.reviewCourse = reviewCourse;
module.exports.publishCourse = publishCourse;
module.exports.getAllTOC = getAllTOC;
//module.exports.getMyTOC         = getMyTOC;
