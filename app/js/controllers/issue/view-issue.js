'use strict';

app.controller('IssueController.ViewIssue', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, notifyService, userService, labelService, projectService, issueService) {
        userService.denyNotLoggedUser();

        var issueId = $routeParams.id;
        issueService.getIssue(issueId).then(function (issue) {
            projectService.getProject(issue.Project.Id).then(function (project) {
                issueService.getComments(issueId).then(function (comments) {
                    issue.LeadId = project.Lead.Id;
                    $scope.issue = issue;
                    $scope.comments=comments;
                }, function (error) {
                    notifyService.showError('Get comments for issue id=' + issueId + ' is failed !', error);
                });
            }, function (error) {
                notifyService.showError('Get project id=' + issue.Project.Id + ' is failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get issue id=' + issueId + ' is failed !', error);
        });

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