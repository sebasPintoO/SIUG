'use strict';
 
angular.module('siugApp.report', ['ngRoute','firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/report', {
        templateUrl: 'app/report/report.html',
        controller: 'RepCtrl'
    });
}])

.controller('RepCtrl', ['$scope','$filter','$firebaseObject','$firebaseArray', function($scope,$filter,$firebaseObject,$firebaseArray) {

	var studentData = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante');

	$scope.student = $firebaseObject(studentData);
}]);