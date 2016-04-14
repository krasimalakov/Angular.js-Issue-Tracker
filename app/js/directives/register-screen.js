app.directive('registerScreen', function () {
    return{
        restrict: 'A',
        templateUrl: 'templates/user/register.html',
        controller: 'UserController.Register'
    }
});