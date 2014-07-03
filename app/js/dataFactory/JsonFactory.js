angular.module("json", []).factory("JsonFactory", ["$http" , function($http){
    return {
        getData: function(path) {
            return $http.get(path);
        }
    };
}]);