var app=angular.module('myApp', ['ngRoute']).

    config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'js/templates/home.html',
            controller: 'HomeController'
        });

        $routeProvider.otherwise({redirectTo: '/home'});
    }]);

