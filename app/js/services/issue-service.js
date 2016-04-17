'use strict';

app.factory('issueService', [
    '$http',
    '$q',
    'BASE_URL',
    'userService',
    function ($http, $q, baseUrl, userService) {

        function getMyIssues(pageSize, pageNumber, orderBy) {
            var deferred = $q.defer();
            var filter='pageSize='+pageSize+'&pageNumber='+pageNumber+'&orderBy='+orderBy;
            $http.get(baseUrl+'Issues/me?'+filter).then(function (issues) {
                deferred.resolve(issues);
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

        return {
            getMyIssues: getMyIssues,
            addIssue: addIssue,
            updateIssue: updateIssue
        }
    }]);