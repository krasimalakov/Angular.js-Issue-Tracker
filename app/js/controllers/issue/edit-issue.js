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
                if ((currentUserId!=project.Lead.Id)&&(currentUserId!=issue.Assignee.Id)){
                    $location.path('/');
                }
                $scope.priorities = project.Priorities;
                $scope.isProjectLeader= project.Lead.Id==currentUserId;
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

        $scope.updateIssue = function (issue) {
            var issueData = {};
            issueData.Title = issue.Title;
            issueData.Description = issue.Description;
            issueData.DueDate = issue.DueDate;
            issueData.AssigneeId = issue.AssigneeId;
            issueData.PriorityId = issue.Priority.Id;
            var labels = issue.Labels.trim().split(/\s*,\s*/);
            issueData.Labels = [];
            labels.forEach(function (label) {
                issueData.Labels.push({Name: label})
            });
            issueService.updateIssue(issueId, issueData).then(function (issue) {
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