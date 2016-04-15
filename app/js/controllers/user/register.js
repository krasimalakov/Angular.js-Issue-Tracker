'use strict';

app.controller('UserController.Register', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.denyNotloggedUser();

        $scope.register = function (user) {
            user.gender = user.gender || 0;
            userService.register(user).then(function (result) {
                notifyService.showInfo('User registration is successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User registration failed !', error);
            });
        };
    }]);