'use strict';

app.controller('ProjectController.AddProject', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        //userService.getAllUsers().then(function (users) {
        //    $scope.users=users;
        //}, function (error) {
        //    notifyService.showError('Get all users request failed !', error);
        //});

        $scope.addProject = function (project) {
            project.labels=project.labels.trim().split(/\s*,\s*/);
            project.priorities=project.priorities.trim().split(/\s*,\s*/);
            console.log(project);
            //userService.getAllUsers().then(function (result) {
            //
            //}, function (error) {
            //    notifyService.showError('Get all users request failed !', error);
            //});
        };
    }]);