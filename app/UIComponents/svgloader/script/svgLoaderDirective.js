angular.module("svgLoader", []).directive("svgLoader", function() {
    return {
        restrict: "EA",
        scope: {
            loaded: "="
        },
        templateUrl: "UIComponents/svgloader/template/loading-bars.html",
        link: function (scope, element, attrs) {
            scope.$watch("loaded", function(){
                if(!scope.loaded){
                    drawLoader();
                }else{
                    //removeLoader();
                }
            });
            
            function removeLoader(){
                d3.select(element[0]).select("svg").transition().duration(1000).style("opacity", 0).remove();
            }
            
            function drawLoader(){
                var width = 64, height = 64, color = "#ababab", text = "Loading", loaded = false;

                if(attrs.width !== "undefined"){
                    width = attrs.width;
                }
                if(attrs.height !== "undefined"){
                    height = attrs.height;
                }
                if(attrs.color !== "undefined"){
                    color = attrs.color;
                }
                
                var svg = d3.select(element[0]).select("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("fill", color);                
                
                var bars = element[0].children[0].childElementCount;
                var index = 0;
                function redraw() {
                    svg.select("#bar" + index)
                        .attr("d", "M0 4 V20 H4 V4z")
                        .transition()
                        .ease("linear")
                        .duration(400)
                        .attr("d", "M0 12 V20 H4 V12z");
                    index++;
                    if( index > bars ){ index = 0;}
                }

                setInterval(function() {
                    redraw();
                }, 100);
            }
        }
    }
});
