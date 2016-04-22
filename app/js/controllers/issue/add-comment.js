'use strict';

app.controller('IssueController.AddComment', [
    '$scope',
    '$location',
    '$routeParams',
    'notifyService',
    'userService',
    'projectService',
    'issueService',
    function ($scope, $location, $routeParams, notifyService, userService, projectService, issueService) {
        userService.denyNotLoggedUser();

        var issueId = $routeParams.id;
        issueService.getIssue(issueId).then(function (issue) {
            projectService.getProject(issue.Project.Id).then(function (project) {
                var currentUserId=userService.getCurrentUser().id;
                if ((currentUserId!=project.Lead.Id)&&(currentUserId!=issue.Assignee.Id)){
                    $location.path('/');
                }
                issue.LeadId = project.Lead.Id;
                $scope.issue = issue;
            }, function (error) {
                notifyService.showError('Get project id=' + issue.Project.Id + ' failed !', error);
            });
        }, function (error) {
            notifyService.showError('Get issue id=' + issueId + ' failed !', error);
        });
        
        $scope.addComment= function (comment) {
            issueService.addComment(issueId, comment).then(function (comments) {
                notifyService.showInfo('Adding comment to issue id='+issueId+' successfully !');
                $location.path('/issues/'+issueId);
            }, function (error) {
                notifyService.showError('Adding comment to issue id='+issueId+' failed !', error);
            });
        }

    
    }]);