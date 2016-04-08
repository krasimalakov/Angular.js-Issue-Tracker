app.controller('HomeController', [
    '$scope',
    function ($scope) {
        $scope.toRegister= function () {
            $scope.showRegisterPage=true;
        }
        $scope.toLogin= function () {
            $scope.showRegisterPage=false;
        }
    }]);