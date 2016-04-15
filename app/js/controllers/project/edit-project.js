'use strict';

app.controller('ProjectController.EditProject', [
    '$scope',
    '$location',
    '$routeParams',
    '$filter',
    'notifyService',
    'userService',
    'labelService',
    'projectService',
    function ($scope, $location, $routeParams, $filter, notifyService, userService, labelService, projectService) {
        userService.denyNotloggedUser();

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

        projectService.getProjects($routeParams.id).then(function (project) {
            project.Labels=$filter('joinArrayProperty')(project.Labels, 'Name');
            project.Priorities=$filter('joinArrayProperty')(project.Priorities, 'Name');
            $scope.project = project;
            console.log(project);
        }, function (error) {
            notifyService.showError('Get project Id='+$routeParams.id+' request failed !', error);
        });

        $scope.updateProject= function (project) {
            var labels = project.Labels.trim().split(/\s*,\s*/);
            project.Labels=[];
            labels.forEach(function (label) {
                project.Labels.push({Name:label})
            });
            var priorities = project.Priorities.trim().split(/\s*,\s*/);
            project.Priorities=[];
            priorities.forEach(function (priority) {
                project.Priorities.push({Name:priority})
            });
            project.LeadId=project.Lead.Id;
            delete project.Lead;
            console.log(project);
            projectService.updateProject(project).then(function (project) {
                notifyService.showInfo('Project update is successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Update project Id='+project.Id+' failed !', error);
            });
        }
    }]);