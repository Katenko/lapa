App.directive('mixitup', ['$window', '$timeout', '$compile', function ($window, $timeout, $compile) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $timeout(function(){
                element.mixItUp();
            });
        }
    };
}]);
