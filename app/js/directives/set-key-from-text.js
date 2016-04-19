app.directive('setKeyFromText', ['$parse', '$filter', function ($parse, $filter) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.bind("change", function (e) {
                var projectKey = $filter('keyFromText')( e.target.value),
                    model = $parse(attrs.setKeyFromText);
                model.assign($scope, projectKey);
                $scope.$apply();
            });
        }
    }
}]);