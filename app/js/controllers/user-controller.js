'use strict';

app.controller('UserController.Register', [
    '$scope',
    '$location',
    'notify',
    'authentication',
    function ($scope, $location, notify, authentication) {
        $scope.register = function (user) {
            authentication.register(user).then(function (result) {
                notify.showInfo('User registration is successful !');
                $location.path('/');
            }, function (error) {
                notify.showError('User registration failed !', error);
            });
        };
    }]);

app.controller('UserController.Login', [
    '$scope',
    '$location',
    'notify',
    'authentication',
    function ($scope, $location, notify, authentication) {
        $scope.login = function (user) {
            authentication.login(user).then(function (result) {
                notify.showInfo('User login is successful !');
                $location.path('/');
            }, function (error) {
                notify.showError('User login failed !', error);
            });
        };
    }]);

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'notify',
    'authentication',
    function ($scope, $location, notify, authentication) {
        authentication.logout();
        notify.showInfo('User is logout !');
        $location.path('/');
    }]);