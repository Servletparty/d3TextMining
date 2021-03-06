angular.module("utilList", []).util.factory("UtilList", function(){
    return{
        findIndexOf: function(list, field, search){
            if( list.length <= 0 || search === '' || field === '' ){ return -1; }
            var i = 0;
            while( i < list.length ){
                if( list[i][field] === search ){ return i; }
                i++;
            }
        }
    };
});