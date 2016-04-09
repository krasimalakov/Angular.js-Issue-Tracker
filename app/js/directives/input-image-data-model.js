app.directive('ngImageDataModel', ['$parse', function ($parse) {
    return {
        link: function ($scope, element, attr) {
            element.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                var fr = new FileReader();
                fr.onload = function () {
                    var model = $parse(attr.ngImageDataModel);
                    model.assign($scope, fr.result);
                    $scope.$apply();
                };
                fr.readAsDataURL(file);
            });
        }
    }
}]);