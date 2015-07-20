'use strict';

app.directive('panelmenu', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var panel = angular.element(document.getElementById('panel')),
				show  = angular.element(document.getElementById('showSetting')),
				self  = iElement;
			
			self.on('click', function(e){

				e.preventDefault();
				self.toggleClass('active');
				panel.toggleClass('active');
				show.toggleClass('active');

			});


		}
	};
})