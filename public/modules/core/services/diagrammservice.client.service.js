'use strict';

angular.module('core').service('Diagrammservice', ['$http', '$q',
	function($http, $q) {
		return {
			getJson: function(file) {
				var deferred = $q.defer();
				$http.get('modules/core/resources/'+file).then(function(data) {
					deferred.resolve(data);
				});
				return deferred.promise;
			}
		};
	}
]);
