angular.module("svgLoader", ["utilAttr"])
        .directive("svgLoader", ["AttrChecker" , function(AttrChecker) {
    return {
        restrict: "EA",
        scope: {
            loaded: "=",
            overlap: "="
        },
        replace: true,
        templateUrl: "UIComponents/svgloader/template/loading-bars.html",
        link: function (scope, element, attrs) {
            scope.$watch("loaded", function(){
                if(!scope.loaded){
                    drawLoader();
                }else{
                    removeLoader();
                }
            });
            
            function removeLoader(){
                d3.select(element[0]).select("svg").transition().duration(1000).style("opacity", 0).remove();
            }
            
            function drawLoader(){
                var size = 64, color = "#ababab", text = "Loading", loaded = false, overlap = true;

                if(attrs.size !== undefined && AttrChecker.isInteger(attrs.size)){
                    size = attrs.size;
                }
                if(attrs.color !== undefined && AttrChecker.isHexColor(attrs.color)){
                    color = attrs.color;
                }
                if(scope.overlap !== undefined && !scope.overlap){
                    overlap = false;
                }
                
                var root = d3.select(element[0]);
                
                if(!overlap){
                    root.style("height", "64px");
                }                
                
                var svg = root.select("svg")
                    .attr("width", size)
                    .attr("height", size)
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
}]);
