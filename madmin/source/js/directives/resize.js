App.directive('resize', ['$window', '$state', '$stateParams', '$timeout', function ($window, $state, $stateParams, $timeout) {
    return {
        restrict: 'A',
        link: function (scope) {
            var w = angular.element($window);
            scope.getWindowDimensions = function () {
                return {
                    'h': w.height(),
                    'w': w.width()
                };
            };

            w.bind('resize', function () {
                waitForFinalEvent(function(){
                    $state.go($state.current, $stateParams, {reload: true});
                }, 500, "unique");
            });
        }
    };
}]);

var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
        if (!uniqueId) {
            uniqueId = "Don't call this twice without a uniqueId";
        }
        if (timers[uniqueId]) {
            clearTimeout (timers[uniqueId]);
        }
        timers[uniqueId] = setTimeout(callback, ms);
    };
})();
