'use strict';

app.controller('authCtrl', function($scope, $http, $location, authFactory){
	var mediaSpot  = angular.element(document.getElementById("mediaSpot"));

	$scope.loginForm     = {};
	$scope.registerForm  = {};


	$scope.signin = function(){
		$http.post(
			'http://08ede76110.url-de-test.ws/users/signin',
			$scope.loginForm
		).success(function(data, status){
			console.log(data);
			 authFactory.saveUser(data);
			 $scope.user = authFactory.getUser();

			 $location.path('/map');

		}).error(function(data, status){
			 if(status == 500){
			 	$scope.titleError = "Connexion";
			 	mediaSpot.addClass('is-visible');
			 	$scope.erromsg = data;
			 }
		});
	};

	$scope.signup = function(){
		$http.post(
			'http://08ede76110.url-de-test.ws/users/signup',
			$scope.registerForm
		).success(function(data, status){
			console.log(data);
			
			authFactory.saveUser(data);
			$scope.user = authFactory.getUser();
			
			$location.path('/follow');
		}).error(function(data, status){
			// console.log(data);
		});
	};

});
