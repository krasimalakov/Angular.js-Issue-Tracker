'use strict';

app.controller('IssueController.AddIssue', [
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

        userService.getAllUsers().then(function (users) {
            $scope.users = users;
        }, function (error) {
            notifyService.showError('Get all users request failed !', error);
        });

        labelService.getLabels('').then(function (labels) {
            $scope.labels = labels;
        }, function (error) {
            notifyService.showError('Get all labels request failed !', error);
        });

        projectService.getProjects().then(function (projects) {
            $scope.projects = projects;
        }, function (error) {
            notifyService.showError('Get all projects request failed !', error);
        });
        $scope.issue={};
        $scope.issue.ProjectId=$routeParams.id;
        $scope.addIssue = function (issue) {
            var labels = issue.Labels.trim().split(/\s*,\s*/);
            issue.Labels=[];
            labels.forEach(function (label) {
                issue.Labels.push({Name:label})
            });
            issue.AssigneeId=issue.Assignee.Id;
            issueService.addIssue(issue).then(function (result) {
                notifyService.showInfo('Issue is added successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Add issue failed !', error);
            })
        };
    }]);