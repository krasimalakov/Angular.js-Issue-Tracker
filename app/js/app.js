var app = angular.module('IssueTracker', ['ngRoute'])
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/')

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'templates/user/logout.html',
            controller: 'UserController.Logout'
        });

        $routeProvider.when('/profile', {
            templateUrl: 'templates/user/edit-profile.html',
            controller: 'UserController.EditProfile'
        });

        $routeProvider.when('/profile/password', {
            templateUrl: 'templates/user/change-password.html',
            controller: ''
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

