/**
 * index
 * 
 * @module      ::js-utils
 * @description :: Represent utility functions for config requests and acts as entry file for config utility package
 * @author      :: Loganathan
 */






getConfig = function (configuration_name) {
    var config_data = {

        EKSTEP_SEARCH_API_URL: "https://dev.ekstep.in/api/search",
        EKSTEP_LEARNING_API_URL: "https://dev.ekstep.in/api/learning",
        EKSTEP_CREATE_CONTENT_URI: "/v2/content",
        EKSTEP_SEARCH_CONTENT_URI: "/v2/search",
        EKSTEP_UPDATE_CONTENT_URI: "/v2/content",
        EKSTEP_GET_CONTENT_URI: "/v2/content",
        EKSTEP_REVIEW_CONTENT_URI: "/v3/content/review",
        EKSTEP_PUBLISH_CONTENT_URI: "/v2/content/publish",
        EKSTEP_LIST_CONTENT_URI: "/v2/content/list",
        EKSTEP_RETIRE_CONTENT_URI: "/v2/content",
        EKSTEP_UPLOAD_CONTENT_URI:"/v2/content/upload",
        
        //Micro Service configuration for Course and Content service
        
        MIME_TYPE_FOR_COURSE : "application/vnd.ekstep.content-collection",
        CONTENT_TYPE_FOR_COURSE : "Collection",
        PREFIX_CODE : 'org.sunbird.'
    };
    return config_data[configuration_name];
};


module.exports = {
    getConfig: getConfig
};



