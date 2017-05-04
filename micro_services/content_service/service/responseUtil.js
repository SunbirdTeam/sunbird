const uuidV1 = require('uuid/v1');

function successResponse(data) {

    response = {};
    response.id = data.id;
    response.ver = data.version;
    response.ts = new Date();

    response.params = getParams(null, null, "successful", null);
    response.responseCode = "OK";
    response.result = data.result;

    return response;
}

function errorResponse(data) {

    response = {};
    response.id = data.id;
    response.ver = data.version;
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


exports.ERROR_CODE = {
    ERR_COURSE_REQ_FIELDS_MISSING : "ERR_COURSE_REQ_FIELDS_MISSING",
    ERR_COURSE_SEARCH_FIELDS_MISSING : "ERR_COURSE_SEARCH_FIELDS_MISSING",
    ERR_COURSE_UPDATE_FIELDS_MISSING : "ERR_COURSE_UPDATE_FIELDS_MISSING"
};

exports.ERROR_MESSAGE = {
    ERR_COURSE_REQ_FIELDS_MISSING : "Required fields for course are missing",
    ERR_COURSE_SEARCH_FIELDS_MISSING : "Required fields for search course are missing",
    ERR_COURSE_UPDATE_FIELDS_MISSING : "Required fields for update course are missing"
};

exports.RESPONSE_CODE = {
    CLIENT_ERROR : "CLIENT_ERROR"
};

exports.GENERIC_MESSAGE = {
    REQUIRED_FIELD_NOT_FOUND : "Required Metadata not set"
};


module.exports.successResponse = successResponse;
module.exports.errorResponse = errorResponse;