/**
 * http utils
 * 
 * @module      ::Lib
 * @description :: Represent utility functions for http requests
 * @author      :: Loganathan
 */
var request = require('request');




//sends http request with specified options and to forward to received response to callback
sendRequest = function (options, cb)
{
    request(options, function (error, response, body) {
        cb(error, response, body);
    });
}


module.exports = {
    sendRequest: sendRequest
};