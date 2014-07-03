var app = angular.module("myApp", ["d3", "underscore", "json", "graphForces", "svgSpinner"]);

app.controller("MainCtrl", [ "$scope", "JsonFactory", function($scope, JsonFactory){
    $scope.loaded = false;

    JsonFactory.getData("data/data.json").success(function(data, status){
        $scope.grapheDatas = data;
        $scope.loaded = true;
        console.log(status);
    }).error(function(data, status){
        console.log(status);
    });

}]);


