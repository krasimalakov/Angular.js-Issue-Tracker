'use strict';
app.controller('AppController', [
    '$scope',
    'userService',
    function ($scope, userService) {
        // Put the userService service in the $scope to make it accessible from all screens
        $scope.userService = userService;
    }
]);