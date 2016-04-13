'use strict';

app.factory('labelService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, baseUrl) {
        function getLabels(filter) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'labels?filter='+filter).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

       
        return {
            getLabels: getLabels
        }
    }]);