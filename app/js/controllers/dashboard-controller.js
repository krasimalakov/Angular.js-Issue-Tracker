'use strict';

app.controller('DashboardController', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, notifyService, userService, projectService, issueService) {
        userService.denyNotLoggedUser();

        $scope.paginationIssue = {
            'startPage': 1,
            'pageSize': 8,
            'maxSize': 999
        };
        $scope.selectIssuesToView = function () {
            issueService.getMyIssues($scope.paginationIssue.pageSize, $scope.paginationIssue.startPage).then(function (data) {
                $scope.paginationIssue.maxSize = $scope.paginationIssue.pageSize * data.TotalPages;
                $scope.issues = data.Issues;
            }, function (error) {
                notifyService.showError('Get my issues request failed !', error);
            });
        };

        $scope.selectIssuesToView();

        issueService.getMyIssues().then(function (data) {
            var issues = data.Issues,
                issuesProjectsId = [];
            issues.forEach(function (issue) {
                    if (issuesProjectsId.indexOf(issue.Project.Id) < 0)
                        issuesProjectsId.push(issue.Project.Id);
                });
            projectService.getMyAndAssignedProjects(issuesProjectsId).then(function (data) {
                var projects=data.Projects;
                console.log(projects.length);

                $scope.paginationProjects = {
                    'startPage': 1,
                    'pageSize': 9,
                    'maxSize': projects.length
                };

                $scope.selectProjectToView = function () {
                    $scope.projects = projects.slice(($scope.paginationProjects.startPage - 1) * $scope.paginationProjects.pageSize,
                        $scope.paginationProjects.startPage * $scope.paginationProjects.pageSize);
                    var a='zdfzdfg';
                };

                $scope.selectProjectToView();


            });
        }, function (error) {
            notifyService.showError('Get my issues request failed !', error);
        });

    }]);