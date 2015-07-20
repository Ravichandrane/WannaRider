'use strict';

app.directive('submit', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var self = iElement,
 				el   = iElement[0],
 				circle = angular.element(document.querySelector('.raisedCircle'));

			self.on('click',function (event) {
				event.preventDefault();				
				var offSetLeft = el.getBoundingClientRect().left;
				var offSetTop = el.getBoundingClientRect().top;
				var x = event.pageX - offSetLeft;
				var y = event.pageY - offSetTop;

				circle.css({
					top: y + 'px',
					left: x + 'px'
				});

				scope.$apply(function(){
					el.classList.add('is-active');
				});

			});

			self.on('animationend webkitAnimationEnd mozAnimationEnd oanimationend MSAnimationEnd', function(){
				el.classList.remove('is-active');
			});
		}
	};
})







