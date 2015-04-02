App.controller('StartController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.getTimes=function(n){
        return new Array(n);
    };
}]);
