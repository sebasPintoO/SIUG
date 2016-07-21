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
	var studentWords = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/palabras');

	$scope.student = $firebaseObject(studentData);
	$scope.studentWords = $firebaseArray(studentWords);
	var definitionCounter= [];

	studentWords.once("value", function(snapshot) {
 		snapshot.forEach(function(childSnapshot){
 			var counter = childSnapshot.numChildren();

 			definitionCounter.push(counter/2);
 		});
  	});
  	//console.log(definitionCounter);
  	$scope.counters = definitionCounter;
  	console.log($scope.counters);


}]);