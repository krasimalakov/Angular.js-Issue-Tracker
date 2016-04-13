'use strict';

app.factory('projectService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, baseUrl) {
        function addProject(project) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'Projects', project).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        return {
            addProject: addProject
        }
    }]);