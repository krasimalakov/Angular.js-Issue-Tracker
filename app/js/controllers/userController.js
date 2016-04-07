'use strict';
app.controller('UserController', [
    '$scope',
    function ($scope) {
        $scope.register= function (user) {
            console.log(user);
        }
    }]);