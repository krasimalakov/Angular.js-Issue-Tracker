'use strict';

app.controller('UserController.Register', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.denyNotLoggedUser();

        $scope.register = function (user) {
            user.gender = user.gender || 0;
            userService.register(user).then(function (result) {
                notifyService.showInfo('User registration successfully !');
                user.username = user.email;
                delete user.email;
                userService.login(user).then(function (result) {
                    notifyService.showInfo('User login successfully !');
                    $location.path('/');
                }, function (error) {
                    notifyService.showError('User login failed !', error);
                });

            }, function (error) {
                notifyService.showError('User registration failed !', error);
            });
        };
    }]);