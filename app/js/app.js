var app = angular.module('IssueTracker', ['ngRoute'])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/')

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider
            .when('/', {
                templateUrl: 'templates/home.html',
                controller: 'HomeController'
            })
            .when('/logout', {
                templateUrl: 'templates/user/logout.html',
                controller: 'UserController.Logout'
            })
            .when('/profile', {
                templateUrl: 'templates/user/edit-profile.html',
                controller: 'UserController.EditProfile'
            })
            .when('/profile/password', {
                templateUrl: 'templates/user/change-password.html',
                controller: 'UserController.ChangePassword'
            })
            .when('/profile/set-admin', {
                templateUrl: 'templates/user/set-admin-permission.html',
                controller: 'UserController.SetAdminPermission'
            })
            .when('/projects', {
                templateUrl: 'templates/project/all-projects.html',
                controller: 'ProjectController.AllProjects'
            })
            .when('/projects/add', {
                templateUrl: 'templates/project/add-project.html',
                controller: 'ProjectController.AddProject'
            })
            .when('/projects/:id/add-issue', {
                templateUrl: 'templates/issue/add-issue.html',
                controller: 'IssueController.AddIssue'
            });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

