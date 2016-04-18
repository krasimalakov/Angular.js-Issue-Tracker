app.directive('inputLabelSuggestList', [function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attr) {
            element.bind("keyup", function (e) {
                var input=e.target.value;
                var selectedWords=input.substring(0, input.lastIndexOf(','));
                var items=eval('$scope.'+attr.inputLabelSuggestList);
                items.forEach(function (item) {
                    var initName=item.Name.split(',').pop();
                    if (selectedWords.length>0){
                        item.Name=selectedWords+','+initName;
                    }else {
                        item.Name=initName;
                    }
                });
            });
        }
    }
}]);