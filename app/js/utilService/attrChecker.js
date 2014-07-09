/*
 * factory used to check attributes provided to elements
 */

angular.module("utilAttr", [])
        .factory("AttrChecker", function(){
    return {
        isInteger: function(value){
            if(typeof parseInt(value) === "number" && Math.floor(parseInt(value)) === parseInt(value)){
                return true;
            }
        },
        isHexColor: function(value){
            var pat = new RegExp("^\#([a-f0-9]{6}|[a-f0-9]{3})$","gi");
            if(value.match(pat)){
                return true;
            }
            return false;
        },
        isRGBColor: function(value){
            // TODO
        }
    };
});
