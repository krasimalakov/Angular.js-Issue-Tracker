'use strict';

app.controller('UserController.ChangePassword', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.denyNotLoggedUser();

        $scope.changePassword = function (userData) {
            userService.changePassword(userData).then(function (result) {
                notifyService.showInfo('User change password successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User change password failed !', error);
            });
        };
    }]);