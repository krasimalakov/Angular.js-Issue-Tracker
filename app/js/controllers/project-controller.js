'use strict';

app.controller('ProjectController.AddProject', [
    '$scope',
    '$location',
    'notifyService',
    function ($scope, $location, notifyService) {

        $scope.addProject = function (project) {
            project.labels=project.labels.trim().split(/\s*,\s*/);
            project.priorities=project.priorities.trim().split(/\s*,\s*/);
            console.log(project);
            //userService.register(user).then(function (result) {
            //    notifyService.showInfo('User registration is successful !');
            //    $location.path('/');
            //}, function (error) {
            //    notifyService.showError('User registration failed !', error);
            //});
        };
    }]);