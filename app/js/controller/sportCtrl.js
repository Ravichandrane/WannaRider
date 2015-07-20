'use strict';

app.controller('sportCtrl', function ($scope, sportsFactory) {
	
	sportsFactory.getSports().then(function(data){

		angular.forEach(data,function(element, index){
			data[index].isCheck = false;
		});

		$scope.sports = data;
	});


	$scope.check = function(id, index){

		if($scope.sports[index].isCheck == true){
			$scope.sports[index].isCheck = false; //uncheck
			sportsFactory.unCheck(id).then(function(data){
				// console.log(data);
			});	
		}else{
			$scope.sports[index].isCheck = true; //check
			sportsFactory.check(id).then(function(data){
				// console.log(data);
			});	
		}
	}

	$scope.isValid = function(){
		sportsFactory.isValid().then(function(data){
			// console.log(data);
		});
	}


	$scope.btnCat = [
		{
			btnName : 'buttonGround',
			catName : 'ground'	
		},
		{
			btnName : 'buttonWater',
			catName : 'water'
		},
		{
			btnName : 'buttonSnow',
			catName : 'snow'
		},
		{
			btnName : 'buttonUrban',
			catName : 'urban'
		}
	];

});