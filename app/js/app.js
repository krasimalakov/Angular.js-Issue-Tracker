var app=angular.module('IssueTracker', ['ngRoute']).

    config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl: 'templates/register.html',
            controller: 'UserController'
        });

        $routeProvider.when('/login', {
            templateUrl: 'templates/login.html',
            controller: ''
        });

        $routeProvider.when('/home', {
            templateUrl: 'templates/home.html',
            controller: ''
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

