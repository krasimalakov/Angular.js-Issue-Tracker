var app = angular.module('IssueTracker', ['ngRoute'])
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/')

    .config(['$routeProvider', function ($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'UserController.Register'
        });

        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: 'UserController.Login'
        });

        $routeProvider.when('/logout', {
            templateUrl: 'templates/home.html',
            controller: 'UserController.Logout'
        });

        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: ''
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

