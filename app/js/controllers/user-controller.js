'use strict';

app.controller('UserController.Register', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {
        $scope.register = function (user) {
            user.gender = user.gender || 0;
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
                notifyService.showInfo('User profile update is successful !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User profile update failed !', error);
            });
        };
    }]);

app.controller('UserController.ChangePassword', [
    '$scope',
    '$location',
    'notifyService',
    'userService',
    function ($scope, $location, notifyService, userService) {

        $scope.changePassword = function (userData) {
            userService.changePassword(userData).then(function (result) {
                notifyService.showInfo('User change password is successful !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('User change password failed !', error);
            });
        };
    }]);