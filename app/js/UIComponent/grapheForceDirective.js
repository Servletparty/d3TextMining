angular.module("graphForces", []).directive("graphForces", function() {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            var width = 500, height = 500;

            if(attrs.width != "undefined"){
                width = attrs.width;
            }
            if(attrs.height != "undefined"){
                width = attrs.height;
            }

            var color = d3.scale.category20();

            // On récupère les données présentent dans scope.grapheDatas
            // Le $watch a pour but de mettre à jour le graphe dès que les
            // données présentent dans $scope.grapheDatas changent.
            // Ex : suppression ou ajout de noeuds
            scope.$watch('grapheDatas', function (grapheDatas) {
                var force = d3.layout.force()
                    .charge(-120)
                    .linkDistance(30)
                    .size([width, height])
                    .nodes(grapheDatas.nodes)
                    .links(grapheDatas.links)
                    .start();

                var svg = d3.select("graph-forces").append("svg")
                    .attr("width", width)
                    .attr("height", height);

                var link = svg.selectAll(".link")
                    .data(grapheDatas.links)
                    .enter().append("line")
                    .attr("class", "link")
                    .style("stroke-width", function(d) { return Math.sqrt(d.value); })
                    .style("stroke", "#dedede");

                var node = svg.selectAll(".node")
                    .data(grapheDatas.nodes)
                    .enter().append("circle")
                    .attr("class", "node")
                    .attr("r", 5)
                    .style("fill", function(d) { return color(d.group); })
                    .call(force.drag);

                node.append("title")
                    .text(function(d) { return d.name; });

                force.on("tick", function() {
                    link.attr("x1", function(d) { return d.source.x; })
                        .attr("y1", function(d) { return d.source.y; })
                        .attr("x2", function(d) { return d.target.x; })
                        .attr("y2", function(d) { return d.target.y; });

                    node.attr("cx", function(d) { return d.x; })
                        .attr("cy", function(d) { return d.y; });
                });
            });
        }
    }
});