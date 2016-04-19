app.directive('setUserIdFromUsername', ['$parse', '$filter', function ($parse, $filter) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.bind("keyup", function (e) {
                getUserId(e);
            });

            element.bind("select", function (e) {
                getUserId(e);
            });

            function getUserId(e) {
                var username = e.target.value,
                    items = eval('$scope.' + attrs.list),
                    model = $parse(attrs.setUserIdFromUsername);
                $(e.target).addClass('non-valid-user');
                model.assign($scope, null);
                $scope.$apply();
                items.forEach(function (item) {
                    if (item.Username === username) {
                        $(e.target).removeClass('non-valid-user');
                        model.assign($scope, item.Id);
                        $scope.$apply();
                        return false;
                    }
                });
            }
        }
    }
}]);