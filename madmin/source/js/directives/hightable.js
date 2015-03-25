App.directive('hightable', ['$window', '$state', '$stateParams', function ($window, $state, $stateParams) {
    return {
        restrict: 'E',
        scope: {
            config:"="
        },
        replace: true,
        templateUrl: "templates/directives/table.html",
        link: function (scope) {

        }
    };
}]);
