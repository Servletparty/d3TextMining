angular.module("graphForces", ["utilAttr"])
        .directive("d3GraphForces", ["AttrChecker" , function(AttrChecker) {
    return {
        restrict: "EA",
        scope: {
            loaded: "=sourceLoaded",
            data: "=graphForcesData",
            filterable: "@",
            displayInfo: "@",
            displayNodesCheckBox: "@"
        },
        replace: true,
        templateUrl: "UIComponents/graphforces/template/graph-forces.html",
        controller: function($scope, $element){
            var filterable = true, displayInfo = true, displayNodesCheckBox = true;
//            scope.filterable = scope.filterable || true;
//            scope.displayInfo = scope.displayInfo || true;
//            scope.displayNodesCheckBox = scope.displayNodesCheckBox || true;
            
            if($scope.filterable !== undefined){
                filterable = $scope.filterable;
            }else{
                $scope.filterable = filterable;
            }
            if($scope.displayInfo !== undefined){
                displayInfo = $scope.displayInfo;
            }else{
                $scope.displayInfo = displayInfo;
            }
            if($scope.displayNodesCheckBox !== undefined){
                displayNodesCheckBox = $scope.displayNodesCheckBox;
            }else{
                $scope.displayNodesCheckBox = displayNodesCheckBox;
            }
        },
        link: function (scope, element, attrs) {
            
            
            var nodeSize = 5, width = 500, heigth = 500;

            if(attrs.graphForcesWidth !== "undefined" && AttrChecker.isInteger(attrs.graphForcesWidth) ){
                width = attrs.graphForcesWidth;
            }
            if(attrs.graphForcesHeight !== "undefined" && AttrChecker.isInteger(attrs.graphForcesHeight)){
                height = attrs.graphForcesHeight;
            }                        

            // watch graphData and update the graph
            scope.$watch("data", function(graphData) {
                if (scope.loaded) {
                    drawGraph(graphData);
                }
            });
            
            function drawGraph(graphData){
                var color = d3.scale.category20();
                var force = d3.layout.force()
                    .charge(-120)
                    .linkDistance(30)
                    .size([width, height])
                    .nodes(graphData.nodes)
                    .links(graphData.links)
                    .start();

                var svg = d3.select(element[0]).select("svg")
                        .attr("width", width)
                        .attr("height", height);

                var link = svg.selectAll(".link")
                    .data(graphData.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function (d) {
                        return Math.sqrt(d.value);
                    })
                    .style("stroke", "#dedede");

                var node = svg.selectAll(".node")
                    .data(graphData.nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .style("fill", function (d) {
                        return color(d.group);
                    })
                    .call(force.drag);

                node.append("title")
                    .text(function (d) {
                        return d.name;
                    });

                force.on("tick", function () {
                    link.attr("x1", function (d) {
                        return d.source.x;
                    })
                        .attr("y1", function (d) {
                            return d.source.y;
                        })
                        .attr("x2", function (d) {
                            return d.target.x;
                        })
                        .attr("y2", function (d) {
                            return d.target.y;
                        });

                    node.attr("cx", function (d) {
                        return d.x;
                    })
                        .attr("cy", function (d) {
                            return d.y;
                        });
                });
            }
        }
    }
}]);