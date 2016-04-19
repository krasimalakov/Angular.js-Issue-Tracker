'use strict';

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'userService',
    function ($http, $q, baseUrl, userService) {

        function getMyIssues(pageSize, pageNumber, orderBy) {
            var deferred = $q.defer();
            var filter = 'orderBy=Project.Name desc, IssueKey' + '&pageSize=' + (pageSize ? pageSize : '') + '&pageNumber=' + (pageNumber ? pageNumber : '');
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

        function updateIssue(issue) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'Issues/' + issue.Id, issue).then(function (response) {
                deferred.resolve(response.data);
            }, function (error) {
                deferred.reject(error.data);
            });

            return deferred.promise;
        }

        function changeIssueStatus(issueId, statusId) {
            var deferred = $q.defer();
            $http.put(baseUrl + 'Issues/' + issueId+'/changestatus?statusid='+statusId).then(function (response) {
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