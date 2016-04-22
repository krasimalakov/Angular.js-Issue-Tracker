'use strict';

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.denyNotLoggedUser();

        userService.logout().then(function (result) {
            notifyService.showInfo('User logout successfully !');
            $location.path('/');
        }, function (error) {
            notifyService.showError('User logout failed !', error);
        });
    }]);