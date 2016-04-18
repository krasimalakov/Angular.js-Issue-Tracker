'use strict';

app.controller('IssueController.ViewIssue', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, notifyService, userService, labelService, projectService, issueService) {
        userService.denyNotloggedUser();

        var issueId=$routeParams.id;
        issueService.getIssue(issueId).then(function (issue) {
            $scope.issue=issue;
            console.log(issue);
        }, function (error) {
            notifyService.showError('Get issue id='+issueId+' failed !', error);
        });

    }]);