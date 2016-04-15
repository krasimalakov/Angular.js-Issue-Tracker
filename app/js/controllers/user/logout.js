'use strict';

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.denyNotloggedUser();

        userService.logout().then(function (result) {
            notifyService.showInfo('User logout is successfully !');
            $location.path('/');
        }, function (error) {
            notifyService.showError('User logout failed !', error);
        });
    }]);