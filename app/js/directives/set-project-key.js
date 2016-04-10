app.directive('setProjectKey', ['$parse', function ($parse) {
    return {
        link: function ($scope, element, attr) {
            element.bind("change", function (e) {
                var projectName = e.target.value,
                    words = projectName.trim().split(/\s+/),
                    projectKey = "";
                words.forEach(function (word) {
                    var c = word.charAt(0);
                    if (c.toLowerCase() != c.toUpperCase()) {
                        projectKey += c;
                    }
                });
                var model = $parse(attr.setProjectKey);
                model.assign($scope, projectKey);
                $scope.$apply();
            });
        }
    }
}]);