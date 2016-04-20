'use strict';

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'projectService',
    function ($http, $q, baseUrl, projectService) {

        function getMyIssues(pageSize, pageNumber) {
            var deferred = $q.defer();
            var filter = 'orderBy=DueDate desc, IssueKey' + '&pageSize=' + (pageSize ? pageSize : 1000000) + '&pageNumber=' + (pageNumber ? pageNumber : 1);
            $http.get(baseUrl + 'Issues/me?' + filter).then(function (respone) {
                deferred.resolve(respone.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getIssue(id) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'Issues/' + id).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function getProjectIssues(projectId) {
            var deferred = $q.defer();
            $http.get(baseUrl + 'Projects/' + projectId + '/Issues').then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function addIssue(issue) {
            var deferred = $q.defer();
            $http.post(baseUrl + 'Issues', issue).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });
            return deferred.promise;
        }

        function updateIssue(issueId, issueData) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'Issues/' + issueId, issueData).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        }

        function changeIssueStatus(issueId, statusId) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'Issues/' + issueId + '/changestatus?statusid=' + statusId).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        }

        return {
            getMyIssues: getMyIssues,
            getIssue: getIssue,
            getProjectIssues: getProjectIssues,
            addIssue: addIssue,
            updateIssue: updateIssue,
            changeIssueStatus: changeIssueStatus
        }
    }]);