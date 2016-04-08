app.controller('HomeController', [
    '$scope',
    function ($scope) {
        $scope.toRegister= function () {
            console.log('to register page!')
            $scope.showRegisterPage=true;
        }
        $scope.toLogin= function () {
            $scope.showRegisterPage=false;
        }
    }]);