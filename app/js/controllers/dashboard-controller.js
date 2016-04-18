'use strict';

app.controller('DashboardController', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, notifyService, userService, projectService, issueService) {
        userService.denyNotloggedUser();

        projectService.getMyProjects().then(function (projects) {
            $scope.paginationProjects = {
                'startPage': 1,
                'pageSize': 3,
                'maxSize': projects.length
            };

            $scope.selectProjectToView = function () {
                $scope.projects = projects.slice(($scope.paginationProjects.startPage - 1) * $scope.paginationProjects.pageSize,
                    $scope.paginationProjects.startPage * $scope.paginationProjects.pageSize);
            };

            $scope.selectProjectToView();

        }, function (error) {
            notifyService.showError('Get projects request failed !', error);
        });
        $scope.paginationIssue = {
            'startPage': 1,
            'pageSize': 3,
            'maxSize': 999999
        };
        issueService.getMyIssues($scope.paginationIssue.pageSize, $scope.paginationIssue.startPage).then(function (data) {
            $scope.paginationIssue.maxSize=$scope.paginationIssue.pageSize*data.TotalPages;

            $scope.issues=data.Issues;
            console.log(data);

        }, function (error) {
            notifyService.showError('Get issues request failed !', error);
        });

    }]);