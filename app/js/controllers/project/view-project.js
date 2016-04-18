'use strict';

app.controller('ProjectController.ViewProject', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, notifyService, userService, projectService, issueService) {
        userService.denyNotloggedUser();

        projectService.getProjects($routeParams.id).then(function (project) {
            $scope.project = project;
            issueService.getProjectIssues(project.Id).then(function (issues) {
                $scope.issues=issues;
                console.log(issues);
            }, function (error) {
                notifyService.showError('Get issues for project Id=' + project.Id + ' request failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get project Id=' + $routeParams.id + ' request failed !', error);
        });

    }]);