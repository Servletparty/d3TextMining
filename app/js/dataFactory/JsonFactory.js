angular.module("json", ["d3"]).factory("JsonFactory", ["$http" , function($http){
    return {
        getData: function(path) {
            return $http.get(path);
        }
    };
}]);