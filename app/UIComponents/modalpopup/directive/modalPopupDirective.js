angular.module("modalPopup", ["utilAttr"])
        .directive("modalPopup", ["$compile", "AttrChecker" , function($compile, AttrChecker) {
    return {
        restrict: "EA",
        scope: {
            content: "@"
        },
        replace: true,
        templateUrl: "UIComponents/modalpopup/template/modal-popup.html",
        link: function (scope, element, attrs) {
            
            function drawModalPopup() {
                var size = 64, color = "#ababab", loaded = false;

                if(attrs.size !== undefined && AttrChecker.isInteger(attrs.size)){
                    size = attrs.size;
                }
                if(attrs.color !== undefined && AttrChecker.isHexColor(attrs.color)){
                    color = attrs.color;
                }
                
                var root = d3.select(element[0]);
            }
            
            openModal();
            
            function openModal() {
                document.getElementById('modal').style.display = 'block';
                document.getElementById('fade').style.display = 'block';
            }

            function closeModal() {
                document.getElementById('modal').style.display = 'none';
                document.getElementById('fade').style.display = 'none';
            }
        }
    }
}]);