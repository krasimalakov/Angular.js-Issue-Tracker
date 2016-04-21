'use strict';

app.controller('ProjectController.AllProjects', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    function ($scope, $location, notifyService, userService, labelService, projectService) {
        if (!userService.isAdmin()) {
            $location.path('/');
        }
        $scope.paginationProjects = {
            'startPage': 1,
            'pageSize': 10,
            'maxSize': 999
        };
        $scope.selectProjectToView = function () {
            projectService.getProjects($scope.paginationProjects.pageSize, $scope.paginationProjects.startPage).then(function (data) {
                $scope.paginationProjects.maxSize = data.TotalCount;
                $scope.projects = data.Projects;
            }, function (error) {
                notifyService.showError('Get projects request failed !', error);
            });
        };
        $scope.selectProjectToView();
    }]);