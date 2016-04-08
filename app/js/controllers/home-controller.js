app.controller('HomeController', [
    '$scope',
    '$location',
    'authentication',
    function ($scope, $location, authentication) {
        if (authentication.isLogged()){

        }else{
            $location.path('/home');
        }
    }]);