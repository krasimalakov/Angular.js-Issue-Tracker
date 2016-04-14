app.directive('dashboardScreen', function () {
    return{
        restrict: 'A',
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardController'
    }
});