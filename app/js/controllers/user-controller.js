'use strict';

app.controller('UserController.Register', [
    '$scope',
    'authentication',
    function ($scope, authentication) {
        $scope.register = function (user) {
            authentication.register(user);
            // todo: notification to register
        };
    }]);

app.controller('UserController.Login', [
    '$scope',
    'authentication',
    function ($scope, authentication) {
        $scope.login = function (user) {
            authentication.login(user);
            // todo: notification to login
        };
    }]);

app.controller('UserController.Logout', [
    '$scope',
    '$location',
    'authentication',
    function ($scope, $location, authentication) {
            authentication.logout();
            // todo: notification to logout
            console.log('log out!!!');
            $location.path('/home');
    }]);