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

  	var highlightsDataOpt1 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt1');
  	var highlightsDataOpt2 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt2');
  	var highlightsDataOpt3 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt3');

  	$scope.hlOpt1 = $firebaseArray(highlightsDataOpt1);
  	$scope.hlOpt2 = $firebaseArray(highlightsDataOpt2);
  	$scope.hlOpt3 = $firebaseArray(highlightsDataOpt3);
  	console.log($scope.hlOpt2);


}]);