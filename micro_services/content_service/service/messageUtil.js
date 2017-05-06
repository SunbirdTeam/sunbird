exports.COURSE = {

    SEARCH: {
        MISSING_CODE: "ERR_COURSE_SEARCH_FIELDS_MISSING",
        MISSING_MESSAGE: "Required fields for search course are missing",
        FAILED_CODE: "ERR_COURSE_SEARCH_FAILED",
        FAILED_MESSAGE: "Search course failed"
    },

    CREATE: {
        MISSING_CODE: "ERR_COURSE_CREATE_FIELDS_MISSING",
        MISSING_MESSAGE: "Required fields for course are missing",
        FAILED_CODE: "ERR_COURSE_CREATE_FAILED",
        FAILED_MESSAGE: "Create course failed"
    },

    UPDATE: {
        MISSING_CODE: "ERR_COURSE_UPDATE_FIELDS_MISSING",
        MISSING_MESSAGE: "Required fields for update course are missing",
        FAILED_CODE: "ERR_COURSE_UPDATE_FAILED",
        FAILED_MESSAGE: "Update course failed"
    },

    REVIEW: {
        MISSING_CODE: "ERR_COURSE_REVIEW_FIELDS_MISSING",
        MISSING_MESSAGE: "Required fields for review course are missing",
        FAILED_CODE: "ERR_COURSE_REVIEW_FAILED",
        FAILED_MESSAGE: "Review course failed"
    },

    PUBLISH: {
        FAILED_CODE: "ERR_COURSE_PUBLISH_FAILED",
        FAILED_MESSAGE: "Publish course failed"
    },

    GET: {
        FAILED_CODE: "ERR_COURSE_GET_FAILED",
        FAILED_MESSAGE: "Get course failed"
    },

    GET_MY: {
        FAILED_CODE: "ERR_COURSE_GET_MY_FAILED",
        FAILED_MESSAGE: "Get my course failed"
    }
};

exports.REQUEST = {

    PARAMS: {
        MISSING_CID_CODE: "ERR_REQUEST_FIELDS_CID_MISSING",
        MISSING_CID_MESSAGE: "Required fields consumer id is missing"
    }

};

exports.RESPONSE_CODE = {
    CLIENT_ERROR: "CLIENT_ERROR",
    SERVER_ERROR: "SERVER_ERROR",
    SUCCESS: "OK"
};

exports.API_VERSION = {
    V1: "1.0"
};
