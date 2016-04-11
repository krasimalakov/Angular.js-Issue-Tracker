'use strict';

app.controller('IssueController.AddIssue', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    function ($scope, $location, $routeParams, notifyService, userService) {

        $scope.addIssue = function (issue) {

            var projectId=$routeParams.id;
            console.log(projectId);
            console.log(issue);

            //userService.getAllUsers().then(function (result) {
            //
            //}, function (error) {
            //    notifyService.showError('Get all users request failed !', error);
            //});
        };
    }]);