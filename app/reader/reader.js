'use strict';
 
angular.module('siugApp.reader', ['ngRoute', 'firebase'])
 
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
  var globalSelectedText = '';

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
 					var wordJs = selectedText.toUpperCase();
 					var definitionJs = definitionObj[selectedText.toUpperCase()];
 					$scope.$apply(function () {
            			$scope.word = wordJs + ':';
            			$scope.definition = definitionJs;

            			var studentWords = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/palabras/' + $scope.word);
            			$scope.studentWords = $firebaseArray(studentWords);
            			$scope.studentWords.$add({
							value: wordJs.toLowerCase(),
							counter: 2
	});
       					});

    			});
    		//Funcion cuando se da click en el boton para resaltar
    		$('#highlight').click(function(){
    			//var oldSpan = document.getElementById('highlighted-id');
    			//console.log(oldSpan);
    			var range = window.getSelection().getRangeAt(0);
    			var highSpan = document.createElement('span');
    			globalSelectedText = range.toString();
    			//console.log(globalSelectedTect);

    			highSpan.className = 'highlighted-text';
    			highSpan.setAttribute("id","highlighted-id");
    			highSpan.appendChild(range.extractContents());
    			range.insertNode(highSpan);
				//console.log(range.toString());
    			//console.log(selectedText);
    		});
    		//Funciones para guardar los highlihgts segun selección del usuario
		    $('#hlOpt1').click(function(){
		    	var hlDatabase1 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt1')
		    	var hlData1 = $firebaseArray(hlDatabase1);
		    	console.log(globalSelectedText);
		    	hlData1.$add({
		    		content: globalSelectedText
		    	});
		    	
		    });

		    $('#hlOpt2').click(function(){
		    	var hlDatabase2 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt2')
		    	var hlData2 = $firebaseArray(hlDatabase2);
		    	console.log(globalSelectedText);
		    	hlData2.$add({
		    		content: globalSelectedText
		    	});
		    });

		    $('#hlOpt3').click(function(){
		    	var hlDatabase3 = new Firebase('https://siug-ugto-08.firebaseio.com/estudiante/lecturas/highlihgts/hlOpt3')
		    	var hlData3 = $firebaseArray(hlDatabase3);
		    	console.log(globalSelectedText);
		    	hlData3.$add({
		    		content: globalSelectedText
		    	});
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
	//console.log(wordJs);
	//console.log(definitionJs);
	setInterval(checkSelectionChanged, 1000);

	var originatorEv;
    this.menuHref = "http://www.google.com/design/spec/components/menus.html#menus-specs";
    this.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };


 
}]);
