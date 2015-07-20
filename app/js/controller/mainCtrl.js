'use strict';

app.controller('mainCtrl', function($scope, authFactory){
	$scope.user = authFactory.getUser();

	$scope.logout = function(){
		authFactory.logout();
	}
})