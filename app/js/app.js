var app = angular.module('IssueTracker', ['ngRoute'])
    .constant('BASE_URL', 'http://softuni-social-network.azurewebsites.net/api/')

    .config(['$routeProvider', function ($routeProvider, authentication) {

        $routeProvider.when('/logout', {
            templateUrl: 'templates/home.html',
            controller: 'UserController.Logout'
        });

        $routeProvider.when('/', {
            templateUrl: 'templates/home.html',
            controller: 'HomeController'
        });

        $routeProvider.otherwise({redirectTo: '/'});
    }]);

