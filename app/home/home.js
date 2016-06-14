'use strict';
 
angular.module('siugApp.home', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/home', {
        templateUrl: 'app/home/home.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', ['$scope','$filter', function($scope,$filter) {

}]);