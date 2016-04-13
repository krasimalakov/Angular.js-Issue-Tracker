'use strict';

app.controller('UserController.EditProfile', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        userService.getProfile().then(function (userProfile) {
            var userData = {
                name: userProfile.name,
                email: userProfile.email,
                gender: userProfile.gender,
                profileImageData: userProfile.profileImageData,
                coverImageData: userProfile.coverImageData
            };
            $scope.userData = userData;
        });

        $scope.editProfile = function (userData) {
            userService.editProfile(userData).then(function (result) {
                notifyService.showInfo('User profile update is successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User profile update failed !', error);
            });
        };
    }]);