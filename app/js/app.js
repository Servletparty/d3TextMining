var app = angular.module("myApp", ["d3", "underscore", "json", "graphForces"]);
//var app = angular.module("myApp", []);

app.controller("MainCtrl", [ "$scope", "JsonFactory", function($scope, JsonFactory){
    $scope.data = {};
    var handleSuccess = function(data, status) {
        $scope.grapheDatas = data;
        $scope.data.status = status;
        console.log($scope.data.status);
    };

    var handleError = function(data, status) {
        $scope.data.status = status;
        console.log($scope.data.status);
    };

    JsonFactory.getData("data/data.json").success(handleSuccess).error(handleError);
}]);

