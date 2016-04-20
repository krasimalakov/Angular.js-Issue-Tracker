'use strict';

app.factory('projectService', [
    '$http',
    '$q',
    'BASE_URL',
    'userService',
    function ($http, $q, baseUrl, userService) {

        function getProject(projectId) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'Projects/' + projectId).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getProjects(pageSize, pageNumber, filter) {
            var deferred = $q.defer(),
                filterUrl = 'filter=' + (filter ? filter : '');
            if (pageSize != undefined) {
                var pagination = 'pageSize=' + (pageSize ? pageSize : '') + '&pageNumber=' + (pageNumber ? pageNumber : '');
                filterUrl += '&' + pagination;
            }
            $http.get(baseUrl + 'Projects?' + filterUrl).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getMyProjects() {
            var deferred = $q.defer();
            var currentUserId = userService.getCurrentUser().id;
            var filterUrl = 'filter=Lead.Id="' + currentUserId + '"&pageSize=1000000&pageNumber=1';
            $http.get(baseUrl + 'projects?' + filterUrl).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getMyAndAssignedProjects(issuesProjectsId, pageSize, pageNumber) {
            var deferred = $q.defer(),
                currentUserId = userService.getCurrentUser().id,
                filterUrl = 'filter=Lead.Id="' + currentUserId + '"';
            for (var i = 0; i < issuesProjectsId.length; i++) {
                filterUrl += ' or Id==' + issuesProjectsId[i];
            }
            filterUrl += '&pageSize=' + pageSize + '&pageNumber=' + pageNumber;
            $http.get(baseUrl + 'projects?' + filterUrl).then(function (response) {
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

        function updateProject(project) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'Projects/' + project.Id, project).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        return {
            getProject: getProject,
            getProjects: getProjects,
            getMyProjects: getMyProjects,
            getMyAndAssignedProjects: getMyAndAssignedProjects,
            addProject: addProject,
            updateProject: updateProject,
        }
    }]);