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


exports.RESPONSE_CODE = {
    CLIENT_ERROR: "CLIENT_ERROR",
    SERVER_ERROR: "SERVER_ERROR",
    SUCCESS : "OK"
};

exports.GENERIC_MESSAGE = {
    REQUIRED_FIELD_NOT_FOUND: "Required Metadata not set"
};

exports.API_ID = {

    COURSE_SEARCH: "api.course.search",
    COURSE_CREATE: "api.course.create",
    COURSE_UPDATE: "api.course.update",
    COURSE_REVIEW: "api.course.review",
    COURSE_PUBLISH: "api.course.publish",
    COURSE_GET_ALL: "api.course.getCourse",
    COURSE_GET_MY: "api.course.getMyCourse",

    CONTENT_SEARCH: "api.content.search",
    CONTENT_CREATE: "api.content.create",
    CONTENT_UPDATE: "api.content.update",
    CONTENT_REVIEW: "api.content.review",
    CONTENT_PUBLISH: "api.content.publish",
    CONTENT_GET_ALL: "api.content.getAllToc",
    CONTENT_GET_MY: "api.content.getMyToc"
};


module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;
