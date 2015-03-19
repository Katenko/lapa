App.factory('BackdataFactory', ['$http', '$q',
	function($http, $q) {
        var backdata = {};
        return {
            loadBackdata: function() {
                var deferred = $q.defer();
                var deferredCategories = $q.defer();
                var deferredDashboards = $q.defer();
                $http.get('/getCategories').then(function(data) {
                    backdata.categories = data.data;
                    deferredCategories.resolve(data.data);
                });
                $http.get('/getDashboards').then(function(data) {
                    backdata.dashboards = data.data;
                    deferredDashboards.resolve(data.data);
                });

                function getResult(values) {
                    deferred.resolve(backdata);
                }
                $q.all([deferredCategories.promise, deferredDashboards.promise]).then(getResult);

                return deferred.promise;
            }
        };
	}
]);
