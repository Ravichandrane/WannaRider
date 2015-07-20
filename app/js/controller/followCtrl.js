'use strict';

app.controller('followCtrl', function($scope, usersFactory){
	usersFactory.getUsers().then(function(data){
		data.pop();

		angular.forEach(data,function(element, index){
			data[index].isFollow = false;
		});

		$scope.followers = data;
	});

	$scope.follow = function(id, index){
		
		if($scope.followers[index].isFollow == true){
			$scope.followers[index].isFollow = false; //unfollow
			usersFactory.unfollow(id).then(function(data){
				// console.log(data);
			});	
		}else{
			$scope.followers[index].isFollow = true; //follow
			usersFactory.follow(id).then(function(data){
				// console.log(data);
			});	
		}

	}

})
