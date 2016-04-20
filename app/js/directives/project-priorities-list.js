app.directive('projectPrioritiesList', ['projectService', function (projectService) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.bind("focus", function (e) {
                projectService.getProject(attrs.projectPrioritiesList).then(function (project) {
                    $scope.priorities=project.Priorities;
                });
            });
        }
    }
}]);