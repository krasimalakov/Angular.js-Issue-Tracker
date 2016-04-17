app.directive('datepicker', [function () {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            $('#' + attrs.id).datepicker().datepicker('option', 'dateFormat', 'yy-mm-dd');
        }
    }
}]);