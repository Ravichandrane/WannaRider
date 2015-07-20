'use strict';

app.controller('spotCtrl', function($scope, $rootScope, $sessionStorage, $route, spotFactory){
		
	var spotType = angular.element(document.getElementById('category'));
	var mediaSpot  = angular.element(document.getElementById("mediaSpot"));

	spotFactory.getCategories().then(function(data){
		$scope.categories = data;
	});

	$scope.submitSpot = function(){
		var lat = $rootScope.latitude.toString();
		var lng = $rootScope.longitude.toString();

		if(spotType[0].options.selectedIndex == 0){
			alert('veuillez choisir une catégorie');
		}else if(!$scope.addSpot.title){
			alert('Votre input est vide');
		}

		spotFactory.addSpot($scope.addSpot,$sessionStorage.files, lat, lng).then(function(data){
			console.log(data);			
		});

		delete $sessionStorage.files;
		$route.reload();
		
	};

})