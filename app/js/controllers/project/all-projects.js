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
            $scope.projects = projects;
        }, function (error) {
            notifyService.showError('Get projects request failed !', error);
        });


    }]);