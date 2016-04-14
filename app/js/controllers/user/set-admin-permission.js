'use strict';

app.controller('UserController.SetAdminPermission', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {

        userService.getAllUsers().then(function (users) {
            $scope.users=users;
        }, function (error) {
            notifyService.showError('Get all users request failed !', error);
        });
        
        $scope.setAdminPermission = function (userId) {
            userService.setAdminPermission(userId).then(function (result) {
                notifyService.showInfo('User set admin permission is successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User set admin permission failed !', error);
            });
        };
    }]);