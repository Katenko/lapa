App.service('DiagramService', ['$http', '$q',
	function($http, $q) {
        this.getJson = function(file) {
            var deferred = $q.defer();
            $http.get('resources/'+file).then(function(data) {
                deferred.resolve(data);
            });
            return deferred.promise;
        };
	}
]);
