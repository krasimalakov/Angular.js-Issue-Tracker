'use strict';

app.controller('ProjectController.ViewProject', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'projectService',
    function ($scope, $location, $routeParams, notifyService, userService, projectService) {
        userService.denyNotloggedUser();

        projectService.getProjects($routeParams.id).then(function (project) {
            $scope.project = project;
        }, function (error) {
            notifyService.showError('Get project Id='+$routeParams.id+' request failed !', error);
        });

    }]);