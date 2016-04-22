'use strict';

app.controller('IssueController.EditIssue', [
    '$scope',
    '$location',
    '$routeParams',
    '$filter',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, $filter, notifyService, userService, labelService, projectService, issueService) {
        userService.denyNotLoggedUser();

        userService.getAllUsers().then(function (users) {
            $scope.users = users;
        }, function (error) {
            notifyService.showError('Get all users request failed !', error);
        });

        labelService.getLabels('').then(function (labels) {
            $scope.labels = labels;
        }, function (error) {
            notifyService.showError('Get all labels request failed !', error);
        });

        var issueId = $routeParams.id;
        issueService.getIssue(issueId).then(function (issue) {
            projectService.getProject(issue.Project.Id).then(function (project) {
                var currentUserId=userService.getCurrentUser().id;
                if ((currentUserId!=project.Lead.Id)&&(currentUserId!=issue.Assignee.Id)&&(!userService.isAdmin())){
                    $location.path('/');
                }
                $scope.priorities = project.Priorities;
                $scope.isEditPermission= ((project.Lead.Id==currentUserId)||(userService.isAdmin()));
                issue.LeadId = project.Lead.Id;
                issue.Labels = $filter('joinArrayProperty')(issue.Labels, 'Name');
                issue.DueDate = new Date(issue.DueDate);
                issue.AssigneeId = issue.Assignee.Id;
                $scope.issue = issue;

            }, function (error) {
                notifyService.showError('Get project id=' + issue.Project.Id + ' failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get issue id=' + issueId + ' failed !', error);
        });

        $scope.updateIssue = function (issueData) {
            var issue = {};
            issue.Title = issueData.Title;
            issue.Description = issueData.Description;
            var date=issueData.DueDate;
            date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
            issue.DueDate = date;
            issue.AssigneeId = issueData.AssigneeId;
            issue.PriorityId = issueData.Priority.Id;
            var labels = issueData.Labels.trim().split(/\s*,\s*/);
            issue.Labels = [];
            labels.forEach(function (label) {
                issue.Labels.push({Name: label})
            });
            issueService.updateIssue(issueId, issue).then(function (issue) {
                notifyService.showInfo('Issue update is successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Update issue id=' + issueId + ' failed !', error);
            });
        }

        $scope.changeIssueStatus= function (statusId) {
            issueService.changeIssueStatus(issueId, statusId).then(function (statuses) {
                $scope.issue.AvailableStatuses.forEach(function (status) {
                    if (status.Id===statusId){
                        $scope.issue.Status=status;
                        return false;
                    }
                });
                $scope.issue.AvailableStatuses=statuses;
                notifyService.showInfo('Change issue status is successful !');
            }, function (error) {
                notifyService.showError('Change issue id=' + issueId + 'status failed !', error);
            });
        }
    }]);