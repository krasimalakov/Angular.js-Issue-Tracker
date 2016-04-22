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

        projectService.getProject($routeParams.id).then(function (project) {
            if ((userService.getCurrentUser().id != project.Lead.Id) && (!userService.isAdmin())) {
                $location.path('/');
            }
            project.Labels = $filter('joinArrayProperty')(project.Labels, 'Name');
            project.Priorities = $filter('joinArrayProperty')(project.Priorities, 'Name');
            $scope.project = project;
        }, function (error) {
            notifyService.showError('Get project Id=' + $routeParams.id + ' request failed !', error);
        });

        $scope.updateProject = function (projectData) {
            var project=JSON.parse(JSON.stringify(projectData));
            if (project.Labels != undefined) {
                var labels = project.Labels.trim().split(/\s*,\s*/);
                project.Labels = [];
                labels.forEach(function (label) {
                    project.Labels.push({Name: label})
                });
            }
            if (project.Priorities != undefined) {
                var priorities = project.Priorities.trim().split(/\s*,\s*/);
            project.Priorities = [];
            priorities.forEach(function (priority) {
                project.Priorities.push({Name: priority})
            });
            } else {
                project.Priorities = [];
            }
            project.LeadId = project.Lead.Id;
            projectService.updateProject(project).then(function (project) {
                notifyService.showInfo('Project update successfully !');
                $location.path('/');
            }, function (error) {
                notifyService.showError('Update project Id=' + project.Id + ' failed !', error);
            });
        }
    }]);