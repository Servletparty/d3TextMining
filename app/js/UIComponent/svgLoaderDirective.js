angular.module("svgLoader", []).directive("svgLoader", function() {
    return {
        restrict: "EA",
        link: function (scope, element, attrs) {
            var width = 64, height = 64, color = "#ababab", text = "Loading";

            if(attrs.width != "undefined"){
                width = attrs.width;
            }
            if(attrs.height != "undefined"){
                height = attrs.height;
            }
            if(attrs.color != "undefined"){
                color = attrs.color;
            }
            if(attrs.text != "undefined" || attrs.text != ""){
                text = attrs.text;
            }
            
            var svg = d3.select("svg-loader").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", color)
                .attr("viewBox", "0 0 32 32");
        
//            var txt = loader.append("text").attr("x", "0").attr("y", "0").attr("dy", ".35em")
//                .text(text);

            var data = [2, 8, 14, 20, 26];

            var paths = svg.selectAll("path").data(data).enter().append("path")
                .attr("id", function(d){
                    return "data-" + d;
                })
                .attr("transform", function(d){
                    return "translate(" + d + ")";
                })
                .attr("d", "M0 12 V20 H4 V12z");
                
            var index = 0;
            function redraw() {
                svg.select("#data-" + data[index])
                    .attr("d", "M0 4 V20 H4 V4z")
                    .transition()
                    .ease("linear")
                    .duration(400)
                    .attr("d", "M0 12 V20 H4 V12z");
                index++;
                if( index > data.length-1 ){ index = 0;}
            }

            setInterval(function() {
                redraw();
            }, 200);
        }
    }
});
