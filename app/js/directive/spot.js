'use strict';

app.directive('ngSpot', [function () {
	return {
		restrict: 'A',
		link: function (scope, iElement, iAttrs) {
			var addSpotBtn = angular.element(document.getElementsByClassName('buttonAddSpot')),
				addSpot    = angular.element(document.getElementById('addSpot')),
				showSpot   = angular.element(document.getElementById('showSpot')),
				back       = angular.element(document.getElementsByClassName('back')),
				infoMedia  = angular.element(document.getElementById('infoMedia')),
				mediaSpot  = angular.element(document.getElementById('mediaSpot')),
				edit  	   = angular.element(document.querySelector('#about-user > .buttonFollowed')),
				editProfil = angular.element(document.querySelector('.modal-form')),
				closeMedia = angular.element(document.querySelector('.mod-button > button'));
			

			/* Close addSpot */
			
			back.on('click', function(e){
				e.preventDefault();
				addSpot.removeClass('active');			
 				showSpot.removeClass('active');
			});

			edit.on('click', function(e){
				e.preventDefault();
				editProfil.addClass('is-visible')
			})

			infoMedia.on('click', function(e){
				e.preventDefault();
				mediaSpot.addClass('is-visible');
				showSpot.removeClass('active');
			});

			closeMedia.on('click', function(){
				mediaSpot.removeClass('is-visible');
			});

		}
	};
}])
