'use strict';
app.controller('AppController', [
    '$scope',
    'authentication',
    function ($scope, authentication) {
        // Put the authentication service in the $scope to make it accessible from all screens
        $scope.authentication = authentication;
    }
]);