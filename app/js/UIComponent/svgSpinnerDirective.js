angular.module("svgSpinner", []).directive("svgSpinner", function() {
    /*return {
        restrict: "EA",
        templateUrl: "partials/svg-spinner/loading-bars.svg"
       *//*scope: {
            width: "=",
            height: "=",
            color: "@"
        }*//*
    };*/
    return {
        restrict: "EA",
        link: function (scope, element, attrs) {
            var width = 64, height = 64, color = "#ababab";

            if(attrs.width != "undefined"){
                width = attrs.width;
            }
            if(attrs.height != "undefined"){
                height = attrs.height;
            }
            if(attrs.color != "undefined"){
                color = attrs.color;
            }

            var svg = d3.select("svg-spinner").append("svg")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", color)
                .attr("viewBox", "0 0 32 32");

            var data = [2, 8, 14, 20, 26];

            var paths = svg.selectAll("path").data(data).enter().append("path")
                .attr("transform", function(d){
                    return "translate(" + d + ")";
                })
                .attr("d", "M0 12 V20 H4 V12z");

            function redraw() {
                svg.selectAll("path")
                    .data([data])
                    .attr("d", "M0 12 V20 H4 V12z")
                    .transition()
                    .ease("linear")
                    .duration(500)
                    .attr("d", "M0 4 V20 H4 V4z");
            }

            setInterval(function() {
                var v = data.shift(); // remove the first element of the array
                data.push(v); // add a new element to the array
                redraw();
            }, 500);
        }
    }
});