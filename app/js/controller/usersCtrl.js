'use strict';

app.controller('usersCtrl', function($scope, usersFactory, $routeParams, $route){
		
	var id = $routeParams.userId;
	$scope.isFollow = false;	

	usersFactory.getOneUser(id).then(function(data){
		$scope.oneUser = data[0];
		var user = data;

		usersFactory.getFollow().then(function(dataFollows){
			
			if(!usersFactory.isFollow(dataFollows, user[0].id)){
				$scope.isFollow = false;
			}else{
				$scope.isFollow = true;
			}

		});
	});

	$scope.follow = function(id){
		
		if($scope.isFollow == true){
			$scope.isFollow = false; //unfollow
			usersFactory.unfollow(id).then(function(data){});	
			$route.reload();
		}else{
			$scope.isFollow = true; //follow
			usersFactory.follow(id).then(function(data){});	
			$route.reload();
		}
	}	

})