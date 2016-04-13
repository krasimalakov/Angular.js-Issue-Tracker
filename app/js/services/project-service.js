'use strict';

app.factory('projectService', [
    '$http',
    '$q',
    'BASE_URL',
    function ($http, $q, baseUrl) {

        function getProjects(projectId) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'Projects/' + (projectId == undefined ? '' : projectId)).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

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
            getProjects: getProjects,
            addProject: addProject
        }
    }]);