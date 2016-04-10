app.directive('setProjectKey', ['$parse', function ($parse) {
    return {
        link: function ($scope, element, attr) {
            element.bind("change", function (e) {
                var projectName = e.target.value,
                    words = projectName.trim().split(/\s+/),
                    projectKey = "";
                words.forEach(function (word) {
                    projectKey += word[0];
                    // todo: ignore not letter characters
                });
                var model = $parse(attr.setProjectKey);
                model.assign($scope, projectKey);
                $scope.$apply();
            });
        }
    }
}]);