'use strict';

app.controller('ProjectController.ViewProject', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, notifyService, userService, projectService, issueService) {
        userService.denyNotLoggedUser();
        var allIssues = [],
            myIssues=[],
            issuesToView=[];
        projectService.getProject($routeParams.id).then(function (project) {
            $scope.project = project;
            issueService.getProjectIssues(project.Id).then(function (issues) {
                allIssues=issues;
                issues.forEach(function (issue) {
                    if (issue.Assignee.Id==userService.getCurrentUser().id){
                        myIssues.push(issue);
                    }
                });
                $scope.paginationIssue = {
                    'startPage': 1,
                    'pageSize': 4,
                    'maxSize': 999
                };
                $scope.selectMyIssuesToView();
                $scope.selectIssuesToView();
            }, function (error) {
                notifyService.showError('Get issues for project Id=' + project.Id + ' request failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get project Id=' + $routeParams.id + ' request failed !', error);
        });

        $scope.selectIssuesToView = function () {
            $scope.issues = issuesToView.slice(($scope.paginationIssue.startPage - 1) * $scope.paginationIssue.pageSize,
                $scope.paginationIssue.startPage * $scope.paginationIssue.pageSize);
        };

        $scope.selectAllIssuesToView= function () {
            $scope.showAllIssue=true;
            issuesToView=allIssues;
            $scope.paginationIssue.startPage=1;
            $scope.paginationIssue.maxSize=issuesToView.length;
            $scope.selectIssuesToView();
        };

        $scope.selectMyIssuesToView= function () {
            $scope.showAllIssue=false;
            issuesToView=myIssues;
            $scope.paginationIssue.startPage=1;
            $scope.paginationIssue.maxSize=issuesToView.length;
            $scope.selectIssuesToView();
        };
    }]);