'use strict';

app.controller('dashCtrl',function($scope, $http, $upload, usersFactory, sportsFactory, $sessionStorage){
	$scope.user = $sessionStorage.user;
	$scope.oneUser = $sessionStorage.user;

	sportsFactory.getSports().then(function(data){

		angular.forEach(data,function(element, index){
			data[index].isCheck = false;
		});

		$scope.sports = data;

		for (var s in $scope.sports) {
			
			$scope.sports.isCheck = false;
			
			for( var us in $sessionStorage.user.sports){
				if($scope.sports[s].id == $sessionStorage.user.sports[us].id){
	                $scope.sports[s].isCheck = true;
	            }	
            }
		};

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

	$scope.updateInfo = function(){
		$http.post('http://08ede76110.url-de-test.ws/users/'+$sessionStorage.user.id, $scope.user)
		.success(function(data, status){
			usersFactory.getOneUser($sessionStorage.user.id).then(function(data){
				console.log(data[0]);
				$scope.user = data[0];
				$sessionStorage.user = data[0];
				$scope.oneUser = data[0];
			});
			// console.log(data);
		})
		.error(function(data, status){
			// console.log(data);
		});
	}
 
	$scope.$watch('files', function () {
	    $scope.uploadProfil($scope.files);
	});

	$scope.uploadProfil = function(files){
		if (files && files.length) {
	    
	    	var file = files[0];

		    $upload.upload({
		        url: 'http://08ede76110.url-de-test.ws/users/newphoto',
		        file: file,
		        Method: 'POST'
		      })
		      .success(function (data, status) {
					usersFactory.getOneUser($sessionStorage.user.id).then(function(data){
						$sessionStorage.user = data[0];
						$scope.oneUser = data[0];
					});
		        // console.log(data);
		      })
		      .error(function(data, status){
		        // console.log(data);
		    });

	    }
	}

});