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

        var issueId = $routeParams.id;
        issueService.getIssue(issueId).then(function (issue) {
            projectService.getProjects(issue.Project.Id).then(function (project) {
                issue.LeadId = project.Lead.Id;
                $scope.issue = issue;
            }, function (error) {
                notifyService.showError('Get project id=' + issue.Project.Id + ' failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get issue id=' + issueId + ' failed !', error);
        });

    }]);