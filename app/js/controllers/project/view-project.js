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
        const defaultSearch = 'defaultSearchShowAllItems';
        var allIssues = [],
            myIssues = [],
            issuesToView = [];
        projectService.getProject($routeParams.id).then(function (project) {
            $scope.project = project;
            issueService.getProjectIssues(project.Id).then(function (issues) {
                allIssues = issues;
                issues.forEach(function (issue) {
                    if (issue.Assignee.Id == userService.getCurrentUser().id) {
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

        $scope.selectAllIssuesToView = function () {
            $scope.showAllIssue = true;
            issuesToView = allIssues;
            initSearchData();
            $scope.paginationIssue.startPage = 1;
            $scope.paginationIssue.maxSize = issuesToView.length;
            $scope.selectIssuesToView();
        };

        $scope.selectMyIssuesToView = function () {
            $scope.showAllIssue = false;
            issuesToView = myIssues;
            initSearchData();
            $scope.paginationIssue.startPage = 1;
            $scope.paginationIssue.maxSize = issuesToView.length;
            $scope.selectIssuesToView();
        };

        $scope.applyFilters = function (search) {
            var issues = ($scope.showAllIssue ? allIssues : myIssues);
            issuesToView = [];
            // filter by Assignee
            if ($scope.search.assignee.Id == defaultSearch) {
                issuesToView = issues;
            } else {
                issues.forEach(function (issue) {
                    if (issue.Assignee.Id==$scope.search.assignee.Id) {
                        issuesToView.push(issue);
                    }
                });
            }

            // finish - apply
            $scope.paginationIssue.startPage = 1;
            $scope.paginationIssue.maxSize = issuesToView.length;
            $scope.selectIssuesToView();
        };

        function initSearchData() {
            $scope.search={};
            $scope.search.assignee={Id: defaultSearch, Username: '- Assignee -'};
            $scope.assignees = [$scope.search.assignee];
            $scope.priorities = [];
            $scope.statuses = [];
            $scope.dueDates = [];
            issuesToView.forEach(function (issue) {
                addItemToCollection(issue.Assignee, $scope.assignees)
            });

            function addItemToCollection(newItem, items) {
                var isItemExist = false;
                items.forEach(function (item) {
                    if (JSON.stringify(item) == JSON.stringify(newItem)) {
                        isItemExist = true;
                    }
                });
                if (!isItemExist) {
                    items.push(newItem);
                }
            }
        }
    }]);