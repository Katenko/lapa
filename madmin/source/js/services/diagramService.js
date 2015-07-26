App.service('DiagramService', ['$http', '$q',
    function ($http, $q) {
        this.getJson = function (file, mode) {
            var deferred = $q.defer();
            var path;
            if (mode > 0) {
                //path = "http://192.168.23.203:8085/cucm-1.0/data/getData/cdr";
                path = "http://localhost:8085/cucm-1.0/data/getData/cdr";
                $http.jsonp(path + "?callback=JSON_CALLBACK").then(function (data) {
                    deferred.resolve(data.data);
                });
            } else {
                path = 'resources/' + file;
                $http.get(path).then(function (data) {
                    deferred.resolve(data.data);
                });
            }
            return deferred.promise;
        };
    }
]);
