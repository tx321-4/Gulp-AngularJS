'use strict';
angular.module('app').controller('positionCtrl',['$http','$scope', function( $http, $scope){
    
    $scope.message = $scope.isLogin?'投个简历':'去登录';

    $http.get('/data/position.json').then(function(resp){
        $scope.position = resp.data;
        
    });
    $http.get('/data/company.json').then(function(resp){
        $scope.company = resp.data;
        
    });

    
}]);