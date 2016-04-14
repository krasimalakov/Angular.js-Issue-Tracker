'use strict';

app.controller('ProjectController.AllProjects', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    function ($scope, $location, notifyService, userService, labelService, projectService) {
        projectService.getProjects().then(function (projects) {

            $scope.pagination = {
                'startPage': 1,
                'pageSize': 9,
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