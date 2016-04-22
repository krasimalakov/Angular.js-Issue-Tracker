'use strict';

app.controller('ProjectController.ViewProject', [
    '$scope',
    '$location',
    '$routeParams',
    '$filter',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, $filter, notifyService, userService, projectService, issueService) {
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
                    if (issue.Assignee.Id == $scope.search.assignee.Id) {
                        issuesToView.push(issue);
                    }
                });
            }

            // filter by Priority
            issues = issuesToView;
            issuesToView = [];
            if ($scope.search.priority.Id == defaultSearch) {
                issuesToView = issues;
            } else {
                issues.forEach(function (issue) {
                    if (issue.Priority.Id == $scope.search.priority.Id) {
                        issuesToView.push(issue);
                    }
                });
            }

            // filter by Priority
            issues = issuesToView;
            issuesToView = [];
            if ($scope.search.status.Id == defaultSearch) {
                issuesToView = issues;
            } else {
                issues.forEach(function (issue) {
                    if (issue.Status.Id == $scope.search.status.Id) {
                        issuesToView.push(issue);
                    }
                });
            }

            // finish - apply
            updateSearchData();
            $scope.paginationIssue.startPage = 1;
            $scope.paginationIssue.maxSize = issuesToView.length;
            $scope.selectIssuesToView();
        };

        $scope.clearFilters = function () {
            issuesToView = ($scope.showAllIssue ? allIssues : myIssues);
            initSearchData();
            $scope.selectIssuesToView();
        };

        function initSearchData() {
            $scope.search = {};
            $scope.search.assignee = {Id: defaultSearch, Username: '- Assignee -'};
            $scope.assignees = [$scope.search.assignee];
            $scope.search.priority = {Id: defaultSearch, Name: '- Priority -'};
            $scope.priorities = [$scope.search.priority];
            $scope.search.status = {Id: defaultSearch, Name: '- Status -'};
            $scope.statuses = [$scope.search.status];
            $scope.search.dueDate = {Id: defaultSearch, Name: '- Due Date -'};
            $scope.dueDates = [$scope.search.dueDate];
            issuesToView.forEach(function (issue) {
                addItemToCollection(issue.Assignee, $scope.assignees);
                addItemToCollection(issue.Priority, $scope.priorities);
                addItemToCollection(issue.Status, $scope.statuses);
                var date=$filter('date')(issue.DueDate,"dd.MM.yyyy");
                addItemToCollection({Id: issue.DueDate, Name: date}, $scope.dueDates);
            });
            sortDueDateCollection();
        }

        function updateSearchData() {
            $scope.assignees = [$scope.assignees[0]];
            $scope.priorities = [$scope.priorities[0]];
            $scope.statuses = [$scope.statuses[0]];
            $scope.dueDates = [$scope.dueDates[0]];
            issuesToView.forEach(function (issue) {
                addItemToCollection(issue.Assignee, $scope.assignees);
                addItemToCollection(issue.Priority, $scope.priorities);
                addItemToCollection(issue.Status, $scope.statuses);
                var date=$filter('date')(issue.DueDate,"dd.MM.yyyy");
                addItemToCollection({Id: issue.DueDate, Name: date}, $scope.dueDates);
            });
            sortDueDateCollection();
        }

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

        function sortDueDateCollection() {
            var dateDeafult=$scope.dueDates[0];

            var dueDates=$scope.dueDates.slice(1,$scope.dueDates.length).sort(function (a, b) {
                return Date.parse(a.Id)<Date.parse(b.Id);
            });

            $scope.dueDates=[dateDeafult];
            dueDates.forEach(function (dateObj) {
                $scope.dueDates.push(dateObj);
            });
        }

    }]);