'use strict';

var app = angular.module("myApp", ["d3", "underscore", "json", "graphForces", "svgLoader", "modalPopup"]);

app.controller("MainCtrl", [ "$scope", "JsonFactory", function($scope, JsonFactory){
    $scope.data = { loaded: false };

    JsonFactory.getData("data/outlook-citrix.json").success(function(data, status){
        $scope.data.graphData = data;
        $scope.data.loaded = true;
        console.log(status);
    }).error(function(data, status){
        console.log(status);
    });
}]);


