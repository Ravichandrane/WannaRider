'use strict';

app.directive('ngClose', function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var media = angular.element(document.getElementById('mediaSpot'));
			var close = angular.element(document.querySelector('#mediaSpot > .mod-button'));
			var closeEdit = angular.element(document.querySelector('.modal-form'));

			iElement.on('click', function(e){
				e.preventDefault();
				media.removeClass('is-visible');
				closeEdit.removeClass('is-visible');
			});
		}
	};
});