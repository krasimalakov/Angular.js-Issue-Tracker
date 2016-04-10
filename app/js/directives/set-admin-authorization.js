app.directive('ngSetAdminAuthorization', ['userService', function (userService) {
    return {
        link: function ($scope, element) {
            element.bind("change", function (e) {
                userService.setAdminPermission(e.target.checked);
            });
        }
    }
}]);