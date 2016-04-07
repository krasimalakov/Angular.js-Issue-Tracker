var app=angular.module('issueTracker', ['ngRoute']).

    config(['$routeProvider', function($routeProvider) {

        $routeProvider.when('/register', {
            templateUrl: 'js/templates/register.html',
            controller: ''
        });

        $routeProvider.when('/login', {
            templateUrl: 'js/templates/login.html',
            controller: ''
        });

        $routeProvider.when('/home', {
            templateUrl: 'js/templates/home.html',
            controller: ''
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

