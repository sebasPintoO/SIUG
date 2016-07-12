'use strict';
 
angular.module('siugApp.reader', ['ngRoute'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
$routeProvider.when('/reader', {
        templateUrl: 'app/reader/reader.html',
        controller: 'RdrCtrl'
    });
}])

.controller('RdrCtrl', ['$scope','$filter','$http','$firebaseArray','$firebaseObject', function($scope,$filter, $http, $firebaseArray, $firebaseObject) {

  $scope.pdfName = 'Bitwise Operation (Example Text)';
  $scope.pdfUrl = 'docs/test-pdf.pdf';
  $scope.scroll = 0;
  $scope.loading = 'loading';
  $scope.word = '';
  $scope.definition = '';

  /** MANEJO DE BASE DE DATOS */ 

  //var dbData = firebase.database().ref();

  //$scope.ejemplo = $firebaseArray(dbData);

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

  //Obtiene la posicion del Mouse con un desfase de 20
  var mousePos;
  $(document).mousemove(function (e) {
  	mousePos = {left: e.pageX + 20, top: e.pageY + 20};
    //console.log(mousePos);
   });

  //Se obtiene la palabra seleccionada
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
// Checa si la selección ha cambiado o esta vacía
function checkSelectionChanged() {
    var current = getSelectedText();
    if(current != selectedText) {
        selectedText = current;
        if(selectedText != '') {
            $('#quote #text').text(selectedText);
            $('#quote').offset(mousePos);
            $('#quote').slideDown("slow");
            $.getJSON("dictionary.json", function( data ) { // Función para obtener palabras del diccionario
    			// Funcion cuando se da click en el boton para definir
    			$('#define').click(function(){
    				var definitionObj = data;
 					wordJs = selectedText.toUpperCase();
 					definitionJs = definitionObj[selectedText.toUpperCase()];
 					$scope.$apply(function () {
            			$scope.word = wordJs + ':';
            			$scope.definition = definitionJs;
       				});

    			});
    		//Funcion cuando se da click en el boton para resaltar
    		$('#highlight').click(function(){
    			//var oldSpan = document.getElementById('highlighted-id');
    			//console.log(oldSpan);
    			var range = window.getSelection().getRangeAt(0);
    			var highSpan = document.createElement('span');

    			highSpan.className = 'highlighted-text';
    			highSpan.setAttribute("id","highlighted-id");
    			highSpan.appendChild(range.extractContents());
    			range.insertNode(highSpan);
				//console.log(range.toString());
    			//console.log(selectedText);


    		});
 				//console.log(wordJs);
 				//console.log(definitionJs);
			});
        } else {
            $('#quote').slideUp("slow");
            $scope.$apply(function () {
            			$scope.word ='';
            			$scope.definition = '';
       				});
        }
    }
}
	console.log(wordJs);
	console.log(definitionJs);
	setInterval(checkSelectionChanged, 1000);
 



 
}]);
