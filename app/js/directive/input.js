'use strict';

app.directive('input', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var self = iElement;

			self.on('focus',function () {
				scope.$apply(function(){
			    	self.parent().addClass('is-focused has-label');    
				});
			}).on('blur', function () {
				var parent = self.parent();
				if(this.value == ''){
					parent.removeClass('has-label');
				}
				scope.$apply(function(){
			    	parent.removeClass('is-focused');
				});
			});
		}
	};
});

app.directive('spot', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var selectOption = angular.element(document.getElementsByClassName('option'));
			iElement.on('click', function(){
				
				if(!(iElement).hasClass('active') && !(selectOption).hasClass('active')){
					iElement.addClass('active');
					selectOption.addClass('active');
				}else{
					iElement.removeClass('active');
					selectOption.removeClass('active');
				}

			});	
		}
	};
})