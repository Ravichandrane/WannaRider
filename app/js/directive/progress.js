'use strict';

app.directive('ngProgress', function ($location, $routeParams, $rootScope) {
	return {
		restrict: 'E',
		templateUrl: 'template/_progress.html',
		link:function(scope, element, attrs){
			console.log($rootScope);
			element.on('click', function(e){
				
				var progressBar = angular.element(document.querySelector("#progressBar > .bar"));

				if($location.path() == "/follow"){
					progressBar.addClass('miActive');
					window.location.href = "#/sport";
				}else{
					progressBar.addClass('fullActive');
					window.location.href = "#/map";
				}				
				

			})
		}
	};
})

