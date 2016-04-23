'use strict';

app.controller('DashboardController', [
    '$scope',
    '$location',
    '$filter',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, $filter, notifyService, userService, projectService, issueService) {
        userService.denyNotLoggedUser();

        $scope.paginationIssue = {
            'startPage': 1,
            'pageSize': 9,
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

            $scope.paginationProjects = {
                'startPage': 1,
                'pageSize': 9,
                'maxSize': 999
            };
            $scope.selectProjectToView = function () {
                projectService.getMyAndAssignedProjects(issuesProjectsId, $scope.paginationProjects.pageSize, $scope.paginationProjects.startPage)
                    .then(function (data) {
                        $scope.projects = data.Projects;
                        $scope.paginationProjects.maxSize=data.TotalCount;
                    });
            };


            $scope.selectProjectToView();
        }, function (error) {
            notifyService.showError('Get my issues request failed !', error);
        });

    }]);