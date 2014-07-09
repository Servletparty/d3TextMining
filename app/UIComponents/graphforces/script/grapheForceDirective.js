angular.module("graphForces", []).directive("graphForces", function() {
    return {
        restrict: "EA",
        scope: {
            loaded: "=",
            data: "="
        },
        replace: true,
        template: '<div class="graph"></div>',
        link: function (scope, element, attrs) {
            var width = 500, height = 500;

            if(attrs.width != "undefined"){
                width = attrs.width;
            }
            if(attrs.height != "undefined"){
                height = attrs.height;
            }

            // watch grapheDatas and update the graph
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

                    var svg = d3.select(element[0]).append("svg")
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
});