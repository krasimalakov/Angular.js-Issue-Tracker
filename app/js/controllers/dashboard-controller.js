'use strict';

app.controller('DashboardController', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'projectService',
    function ($scope, $location, notifyService, userService, projectService) {
        projectService.getMyProjects().then(function (projects) {
            $scope.pagination = {
                'startPage': 1,
                'pageSize': 3,
                'maxSize': projects.length
            };

            $scope.selectProjectToView = function () {
                $scope.projects = projects.slice(($scope.pagination.startPage - 1) * $scope.pagination.pageSize,
                    $scope.pagination.startPage * $scope.pagination.pageSize);
            };

            $scope.selectProjectToView();

        }, function (error) {
            notifyService.showError('Get projects request failed !', error);
        });


    }]);