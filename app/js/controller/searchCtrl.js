'use strict';

app.controller('searchCtrl', function($scope, $http, $location, $sessionStorage, $route){
	$scope.search     = {};

	$scope.searchSubmit = function(){
		$sessionStorage.search = $scope.search.text;
		$location.path('/search');
		$route.reload();
	};
});

app.controller('searchCtrl2', function($scope, $http, $location, $sessionStorage){
	$http.get(
		'http://08ede76110.url-de-test.ws/users/search/' + $sessionStorage.search
	).success(function(data, status){
		$scope.infos = data;
		
		for (var i = 0; i < $scope.infos.length; i++) {
			if($scope.infos[i].id == $sessionStorage.user.id){
				$scope.infos.splice(i, 1);
			}
		};

	}).error(function(data, status){
		// console.log(data);
	});
});