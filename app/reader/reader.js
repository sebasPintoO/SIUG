'use strict';
 
angular.module('siugApp.reader', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/reader', {
        templateUrl: 'app/reader/reader.html',
        controller: 'RdrCtrl'
    });
}])

.controller('RdrCtrl', ['$scope','$filter','$http', function($scope,$filter, $http) {

  $scope.pdfName = 'PDF de ejemplo';
  $scope.pdfUrl = 'docs/test-pdf.pdf';
  $scope.scroll = 0;
  $scope.loading = 'loading';
  $scope.word = '';
  $scope.definition = '';

  var	definitionJs;
  var	wordJs;

  $scope.getNavStyle = function(scroll) {
    if(scroll > 100) return 'pdf-controls fixed';
    else return 'pdf-controls';
  }

  $scope.onError = function(error) {
    console.log(error);
  }

  $scope.onLoad = function() {
    $scope.loading = '';
  }

  $scope.onProgress = function(progress) {
    console.log(progress);
  }

  /************ SELECTOR DE PALABRAS ************/

  var mousePos;
  $(document).mousemove(function (e) {
  	mousePos = {left: e.pageX + 20, top: e.pageY + 20};
    //console.log(mousePos);
   });

  var selectedText = '';
	function getSelectedText(){ 
    if(window.getSelection){ 
    	//console.log(window.getSelection().toString());
        return window.getSelection().toString();

    } 
    else if(document.getSelection){ 
        return document.getSelection(); 
    } 
    else if(document.selection){ 
        return document.selection.createRange().text; 
    } 
} 

function checkSelectionChanged() {
    var current = getSelectedText();
    if(current != selectedText) {
        selectedText = current;
        if(selectedText != '') {
            $('#quote #text').text(selectedText);
            $('#quote').offset(mousePos);
            $('#quote').show();
            $.getJSON("dictionary.json", function( data ) {
    			// do whatever you want
 				var definitionObj = data;
 				wordJs = selectedText.toUpperCase();
 				definitionJs = definitionObj[selectedText.toUpperCase()];
 				$scope.$apply(function () {
            		$scope.word = wordJs;
            		$scope.definition = definitionJs;
       			});
 				
 				//console.log(wordJs);
 				//console.log(definitionJs);
			});
        } else {
            $('#quote').hide();
        }
    }
}
console.log(wordJs);
console.log(definitionJs);
setInterval(checkSelectionChanged, 1000);
 



 
}]);
