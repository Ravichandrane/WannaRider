'use strict';

app.controller('DropCtrl', function ($scope, $upload, $sessionStorage) {

  $scope.spotData ={};

  $scope.$watch('files', function () {
      $scope.upload($scope.files);
  });

  $scope.upload = function (files) {
    
    var photo      = angular.element(document.getElementById('photo'));
    var iconPhoto  = angular.element(document.querySelector('.photoUp > .dropIcon '));
    var iconVideo  = angular.element(document.querySelector('.videoUp > .dropIcon '));
    var mediaSpot  = angular.element(document.getElementById("mediaSpot"));


    if (files && files.length) {
      
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
  
        $upload.upload({
          url: 'http://08ede76110.url-de-test.ws/spots/upload',
          file: file,
          Method: 'POST'
        }).progress(function (e) {
          
          file.progress = Math.min(100, parseInt(100.0 * e.loaded / e.total));
          var typeFile = e.config.file.type;

          if(typeFile == "image/png" || typeFile == "image/jpeg"){
            iconPhoto.css({display : 'none'});
            $scope.photo = i ;
          }
          
          if(typeFile == "video/mp4"){
            iconVideo.css({display : 'none'});
            $scope.video = i ;
          }

        })
        .success(function (data, status) {
          console.log(data);
          
          if(data.code != 404){
            $sessionStorage.files = $sessionStorage.files || new Array();
            $sessionStorage.files.push(data.data); 
          }else{
            mediaSpot.addClass('is-visible');
          }

        })
        .error(function(data, status){
          console.log(data);
        });

      }//End For

    }//End If

  }; //End Upload function
});




