app.directive('datepicker', [function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attr) {
            $( "#inputDueDate" ).datepicker();
        }
    }
}]);