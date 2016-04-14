'use strict';

app.controller('DashboardController', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    'projectService',
    function ($scope, $location, notifyService, userService, projectService) {
        projectService.getProjects().then(function (projects) {
            $scope.projects = projects;
            console.log(projects);
        }, function (error) {
            notifyService.showError('Get projects request failed !', error);
        });


    }]);