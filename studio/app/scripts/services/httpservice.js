'use strict';

/**
 * @ngdoc service
 * @name studioApp.httpService
 * @description
 * # httpService
 * Service in the studioApp.
 */
angular.module('studioApp')
  .service('httpService', function($http) {
         
        function postOperation(url, data, headers) {
            var request = httpCall(url, data, "POST",headers);
            return( request.then(handleSuccess, handleError) );
        }

        function getOperation(url, data,headers) {
            var request = httpCall(url, data, "GET",headers);
            return( request.then(handleSuccess, handleError) );
        }

        function deleteOperation(url, data,headers) {
            var request = httpCall(url, data, "DELETE",headers);
            return( request.then(handleSuccess, handleError) );
        }

        function putOperation(url, data,headers) {
            var request = httpCall(url, data, "PUT",headers);
            return( request.then(handleSuccess, handleError) );
        }

        function handleSuccess(response) {
            return( response.data );
        }

        function handleError(response) {
            return( response.data);
        }
        
        function getHeader() {
            var headers = {
                'Content-Type' : 'application/json',
                'cid' : 'sunbird'
            };
            return headers;
        }
        
        function httpCall(url, data, method, headers) {
            var headers = headers || getHeader();
            
            return $http({
                method: method,
                url: url,
                headers: headers,
                data: {request : data}
            });
        }
        
        return({
            getOperation: getOperation,
            postOperation: postOperation,
            putOperation: putOperation,
            deleteOperation: deleteOperation
        });
  });
