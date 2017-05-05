const uuidV1 = require('uuid/v1');

function successResponse(data) {

    response = {};
    response.id = data.id;
    response.ver = getApiVersion();
    response.ts = new Date();

    response.params = getParams(null, null, "successful", null);
    response.responseCode = "OK";
    response.result = data.result;

    return response;
}

function errorResponse(data) {

    response = {};
    response.id = data.id;
    response.ver = getApiVersion();
    response.ts = new Date();

    response.params = getParams(data.msgId, data.errCode, "failed", data.errMsg);
    response.responseCode = data.responseCode;
    response.result = data.result;

    return response;
}

function getParams(msgId, errCode, status, msg) {
    params = {};
    params.resmsgid = generateUUID();
    params.msgid = msgId;
    params.err = errCode;
    params.status = status;
    params.errmsg = msg;

    return params;
}

function generateUUID() {
    return uuidV1();
}

function getApiVersion() {
    return '1.0';
}


exports.ERROR_CODE = {
    ERR_COURSE_REQ_FIELDS_MISSING: "ERR_COURSE_REQ_FIELDS_MISSING",
    ERR_COURSE_REQ_FAILED: "ERR_COURSE_REQ_FAILED",

    ERR_COURSE_SEARCH_FIELDS_MISSING: "ERR_COURSE_SEARCH_FIELDS_MISSING",
    ERR_COURSE_SEARCH_FAILED: "ERR_COURSE_SEARCH_FAILED",

    ERR_COURSE_UPDATE_FIELDS_MISSING: "ERR_COURSE_UPDATE_FIELDS_MISSING",
    ERR_COURSE_UPDATE_FAILED: "ERR_COURSE_UPDATE_FAILED",

    ERR_COURSE_REVIEW_FAILED: "ERR_COURSE_REVIEW_FAILED",

    ERR_COURSE_PUBLISH_FAILED: "ERR_COURSE_PUBLISH_FAILED",

    ERR_COURSE_GET_ALL_TOC_FAILED: "ERR_COURSE_GET_ALL_TOC_FAILED",

    ERR_COURSE_GET_MY_TOC_FAILED: "ERR_COURSE_GET_MY_TOC_FAILED"
};

exports.ERROR_MESSAGE = {
    ERR_COURSE_REQ_FIELDS_MISSING: "Required fields for course are missing",
    ERR_COURSE_REQ_FAILED: "Create course failed",

    ERR_COURSE_SEARCH_FIELDS_MISSING: "Required fields for search course are missing",
    ERR_COURSE_SEARCH_FAILED: "Search course failed",

    ERR_COURSE_UPDATE_FIELDS_MISSING: "Required fields for update course are missing",
    ERR_COURSE_UPDATE_FAILED: "Update course failed",

    ERR_COURSE_REVIEW_FAILED: "Review course failed",

    ERR_COURSE_PUBLISH_FAILED: "Publish course failed",

    ERR_COURSE_GET_ALL_TOC_FAILED : "Get All toc failed",

    ERR_COURSE_GET_MY_TOC_FAILED : "Get All toc failed"

};

exports.RESPONSE_CODE = {
    CLIENT_ERROR: "CLIENT_ERROR",
    SERVER_ERROR: "SERVER_ERROR"
};

exports.GENERIC_MESSAGE = {

    SUCCESS_RESPONCE_CODE : "OK",

    REQUIRED_FIELD_NOT_FOUND: "Required Metadata not set"
};

exports.API_ID = {

    COURSE_SEARCH: "sunbird.course.search",
    COURSE_CREATE: "sunbird.course.create",
    COURSE_UPDATE: "sunbird.course.update",
    COURSE_REVIEW: "sunbird.course.review",
    COURSE_PUBLISH: "sunbird.course.publish",
    COURSE_GET_ALL: "sunbird.course.getAllToc",
    COURSE_GET_MY: "sunbird.course.getMyToc",

    CONTENT_SEARCH: "sunbird.content.search",
    CONTENT_CREATE: "sunbird.content.create",
    CONTENT_UPDATE: "sunbird.content.update",
    CONTENT_REVIEW: "sunbird.content.review",
    CONTENT_PUBLISH: "sunbird.content.publish",
    CONTENT_GET_ALL: "sunbird.content.getAllToc",
    CONTENT_GET_MY: "sunbird.content.getMyToc"
};


module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;
