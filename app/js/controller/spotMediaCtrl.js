'use strict';

app.controller('spotMediaCtrl', function($scope, spotFactory, $rootScope, $route){

	$rootScope.isCheck = false;

	$scope.showMedia = function(){
		spotFactory.getOneMedia($rootScope.spot_id).then(function(data){
			$scope.spotMedias = data;
		});
	
		spotFactory.getSpot($rootScope.spot_id).then(function(data){
			$scope.spotData = data[0];
		});
	};

	$scope.favSpot = function(){
		if($rootScope.isCheck == true){
			$rootScope.isCheck = false; //uncheck
			spotFactory.unFav($rootScope.spot_id).then(function(data){
				// console.log(data);
			});	
		}else{
			$rootScope.isCheck = true; //check
			spotFactory.favSpot($rootScope.spot_id).then(function(data){
				// console.log(data);
			});	
		} 
	}


})