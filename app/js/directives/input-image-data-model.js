app.directive('imageDataModel', ['$parse', function ($parse) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                var fr = new FileReader();
                fr.onload = function () {
                    var model = $parse(attrs.imageDataModel);
                    model.assign($scope, fr.result);
                    $scope.$apply();
                };
                fr.readAsDataURL(file);
            });
        }
    }
}]);