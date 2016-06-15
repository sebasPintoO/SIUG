'use strict';
 
angular.module('siugApp.register', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/register', {
        templateUrl: 'app/register/register.html',
        controller: 'RegCtrl'
    });
}])

.controller('RegCtrl', ['$scope','$filter', function($scope,$filter) {

}]);