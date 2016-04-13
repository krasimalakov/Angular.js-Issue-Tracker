'use strict';

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.logout().then(function (result) {
            notifyService.showInfo('User logout is successful !');
            $location.path('/');
        }, function (error) {
            notifyService.showError('User logout failed !', error);
        });
    }]);