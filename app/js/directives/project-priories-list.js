app.directive('projectPrioriesList', ['projectService', function (projectService) {
    return {
        restrict: 'A',
        link: function ($scope, element, attrs) {
            element.bind("focus", function (e) {
                projectService.getProjects(attrs.projectPrioriesList).then(function (project) {
                    $scope.priorities=project.Priorities;
                });
            });
        }
    }
}]);