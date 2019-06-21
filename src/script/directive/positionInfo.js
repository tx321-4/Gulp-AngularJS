'use strict';
angular.module('app').directive('appPositionInfo', ['$http', function($http){
    return {
        restrict: 'A',
        replace: true,
        templateUrl: 'view/template/positionInfo.html',
        scope:{
            pos: '='
        },
        
    }
}])