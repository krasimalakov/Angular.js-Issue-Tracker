app.directive('setUserIdFromUsername', ['$parse', '$filter', function ($parse, $filter) {
    return {
        restrict: 'A',
        link: function ($scope, element, attr) {
            element.bind("keyup", function (e) {
                var username = e.target.value,
                    items = eval('$scope.' + attr.list),
                    model = $parse(attr.setUserIdFromUsername);
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
            });
        }
    }
}]);