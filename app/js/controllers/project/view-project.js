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
        userService.denyNotLoggedUser();

        projectService.getProject($routeParams.id).then(function (project) {
            $scope.project = project;
            issueService.getProjectIssues(project.Id).then(function (issues) {
                $scope.allIssues = issues;
                $scope.paginationIssue = {
                    'startPage': 1,
                    'pageSize': 4,
                    'maxSize': $scope.allIssues.length
                };
                $scope.selectIssuesToView();
            }, function (error) {
                notifyService.showError('Get issues for project Id=' + project.Id + ' request failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get project Id=' + $routeParams.id + ' request failed !', error);
        });

        $scope.selectIssuesToView = function () {
            $scope.issues = $scope.allIssues.slice(($scope.paginationIssue.startPage - 1) * $scope.paginationIssue.pageSize,
                $scope.paginationIssue.startPage * $scope.paginationIssue.pageSize);
        };
    }]);