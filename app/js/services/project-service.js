'use strict';

app.factory('projectService', [
    '$http',
    '$q',
    'BASE_URL',
    'userService',
    function ($http, $q, baseUrl, userService) {

        function getProjects(projectId) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'Projects/' + (projectId == undefined ? '' : projectId)).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getMyProjects(projectId) {
            var deferred = $q.defer();
            getProjects().then(function (projects) {
                var myProjects=[];
                projects.forEach(function (project) {
                    // todo: add expression for my project by my issue
                    if (project.Lead.Id==userService.getCurrentUser().id){
                        myProjects.push(project);
                    }
                });
                deferred.resolve(myProjects);
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
            getMyProjects: getMyProjects,
            addProject: addProject
        }
    }]);