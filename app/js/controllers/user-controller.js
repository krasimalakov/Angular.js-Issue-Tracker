'use strict';

app.controller('UserController.Register', [
    '$scope',
    '$location',
    'notifyServiceService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        $scope.register = function (user) {
            userService.register(user).then(function (result) {
                notifyService.showInfo('User registration is successful !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User registration failed !', error);
            });
        };
    }]);

app.controller('UserController.Login', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        $scope.login = function (user) {
            userService.login(user).then(function (result) {
                notifyService.showInfo('User login is successful !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User login failed !', error);
            });
        };
    }]);

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.logout();
        notifyService.showInfo('User is logout !');
        $location.path('/');
    }]);