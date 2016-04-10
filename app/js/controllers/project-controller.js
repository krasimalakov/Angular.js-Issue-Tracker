'use strict';

app.controller('ProjectController.AddProject', [
    '$scope',
    '$location',
    'notifyService',
    function ($scope, $location, notifyService) {
        $scope.addProject = function (project) {
            console.log(project);
            //userService.register(user).then(function (result) {
            //    notifyService.showInfo('User registration is successful !');
            //    $location.path('/');
            //}, function (error) {
            //    notifyService.showError('User registration failed !', error);
            //});
        };
    }]);