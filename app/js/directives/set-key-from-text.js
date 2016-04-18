app.directive('setKeyFromText', ['$parse', '$filter', function ($parse, $filter) {
    return {
        restrict: 'A',
        link: function ($scope, element, attr) {
            element.bind("change", function (e) {
                var projectKey = $filter('keyFromText')( e.target.value),
                    model = $parse(attr.setKeyFromText);
                model.assign($scope, projectKey);
                $scope.$apply();
            });
        }
    }
}]);