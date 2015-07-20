'use strict';

app.directive('ngMap', function ($rootScope, weatherFactory, spotFactory, $route) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {

			/*==========  Global variables  ==========*/
			var map,
			markers   = [],
			input     = document.getElementById('pac-input'),
			submitR   = document.getElementById('sub'),
			geo       = document.getElementById('geo'),
			infoT     = document.getElementById('title'),
			infoMedia   = document.getElementById('infoMedia'),
			infoWeather = document.getElementById('weather'),
			infoSun   = document.getElementById('infoSun'),
			addSpot   = document.getElementById('addSpot'),
			showSpot  = document.getElementById('showSpot'),
			mediaSpot = document.getElementById('mediaSpot'),
			back      = document.querySelector('#addSpot .back'),
			searchBox = new google.maps.places.SearchBox(input),
			searchbox = document.getElementById('searchbox');			 
			
			/*==========  Init params [Default]  ==========*/
			var myOptions = {
			      zoom: 10,
			      minZoom: 7,
			      center: new google.maps.LatLng(48.856544, 2.350321),
			      disableDefaultUI: true,
			      styles: [{stylers: [{ hue: "#000000" },{ saturation: -100 }]},{featureType: "road",elementType: "geometry",stylers:[{ lightness: 100 },{ visibility: "simplified" }]},{featureType: "road",elementType: "labels",stylers: [{ visibility: "off" }]}]
			}; 

			map = new google.maps.Map(document.getElementById(attrs.id), myOptions);
    		map.controls[google.maps.ControlPosition.TOP_LEFT].push(input); 			

    		/*==========  SetMarker ==========*/	
			scope.setMarkers = function(map, locations, event){
			      
			    spotFactory.getSpots().then(function(places){
			        
			        angular.forEach(places, function(value, key){
			           
				        var id   = value.id,
				        title    = value.title,
				        category = value.category,
				        nbPhoto  = value.nb_photos,
				        nbVideo  = value.nb_videos,
				        lat      = value.latitude,
				        lng      = value.longitude;

				        var img = {
							url: '../img/pin/'+category+'.png',
							origin: new google.maps.Point(0,0)
						};

			          	var myLatLng = new google.maps.LatLng(lat,lng);

				        var marker = new google.maps.Marker({
				            position: myLatLng,
				            map : map,
				            icon: img,
				            title: title,
				            category : category,
				            animation: google.maps.Animation.DROP
				        });

			          	google.maps.event.addListener(marker, 'click', function(e){
			          		
			            	map.setCenter(marker.position);
			            	map.panBy(0,5);

				            if(addSpot.classList.contains('active')){
				              addSpot.classList.remove('active');
				              scope.clearMarker();
				            }
							
							if(mediaSpot.classList.contains('is-visible')){
							    mediaSpot.classList.remove('is-visible');
							}

			            	showSpot.classList.add('active');

			            	$rootScope.spot_id = id;

			            	// console.log($rootScope);

			            	spotFactory.getFavSpot().then(function(dataFav){
								if(!spotFactory.isFavSpot(dataFav, $rootScope.spot_id)){
									$rootScope.isCheck = false;
								}else{
									$rootScope.isCheck = true;
								}
							});		

				         	infoMedia.innerHTML   = '<span class="photo left"><p>'+nbPhoto+'</p><p>photo(s)</p></span>';
				         	infoMedia.innerHTML  += '<hr>';
				         	infoMedia.innerHTML  += '<span class="video right"><p>'+nbVideo+'</p><p>video(s)</p></span>';
				         	infoMedia.innerHTML  += '<div class="clear"></div>';
				            
				            weatherFactory.getWeather(lat, lng).then(function(data){

				              var icon       = data.conditionsshort.observation.wx_icon;
				              var maxTemp    = data.conditionsshort.observation.metric.max_temp;
				              var minTemp    = data.conditionsshort.observation.metric.min_temp;
				              var sunrise    = new Date(data.fcstdaily10short.forecasts[0].sunrise).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});
				              var sunset     = new Date(data.fcstdaily10short.forecasts[0].sunset).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'});

				              infoT.innerHTML    = '<h2>'+marker.title+'</h2>' +'<span class="smallTitle">'+marker.category+'</span>';
				              

				              infoWeather.innerHTML  = '<span class="imgWeather left"><img src="img/weather/'+icon+'.png" alt=""> </span>';
				              infoWeather.innerHTML += '<div class="temperature right"><div class="max"><p>max <span class="temp">'+maxTemp+'°</span></p></div><div class="min"><p>min<span class="temp">'+minTemp+'°</span></p></div></div>';
				              infoWeather.innerHTML += '<div class="clear"></div>';

				              infoSun.innerHTML  = '<span class="sunrise left"><p>'+sunrise+'</p><p>lever du soleil</p></span>';
				              infoSun.innerHTML += '<hr>';
				              infoSun.innerHTML += '<span class="sunset right"><p>'+sunset+'</p><p>coucher du soleil</p></span>';

				            });//End API Weather

			         	});//End Event Click marker

			        });//End forEach

			    });//End spotFactory

			}//End setMarkers       		


			/*==========  Function  ==========*/
		 	scope.placesChanged = function (){
		     	scope.places = searchBox.getPlaces();
		     	
		     	if(scope.places.length == 0){
		       		return;
		     	}

		     	scope.bounds = new google.maps.LatLngBounds();

			    for(var i = 0, place; place = scope.places[i]; i++){
			       scope.bounds.extend(place.geometry.location);
			    }

			    map.fitBounds(scope.bounds);
			    map.setZoom(12);
		  	};

			scope.buttonSearch = function(){
			    var location = input.value;
			    
			    new google.maps.Geocoder().geocode( { 'address': location}, function(results, status) {
			      	if (status == google.maps.GeocoderStatus.OK) {
			        	var marker = new google.maps.Marker();
			        	marker.setPosition(results[0].geometry.location);
			        	map.setCenter(results[0].geometry.location);
			        	map.setZoom(12);
			        	location = results[0].formatted_address;
			        }
			    });

			};	

			scope.getLocation = function(){
			    if(navigator.geolocation) {
			      navigator.geolocation.getCurrentPosition(function(position) {
			        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			        map.setCenter(pos);
			        map.setZoom(17);
			      });
			    }
			};

			scope.boundsChanged = function (){
			   scope.boundsUpdated = map.getBounds();
			   searchBox.setBounds(scope.boundsUpdated);
			};							  	

			scope.addMarker = function(pos){
			    var myLatlng = new google.maps.LatLng(pos.lat,pos.lng);
			    var marker   = new google.maps.Marker({
			      position: myLatlng, 
			      map: map,
			      animation: google.maps.Animation.DROP
				});

			    $rootScope.latitude  = pos.lat;
			    $rootScope.longitude = pos.lng;

			    if(showSpot.classList.contains('active') || mediaSpot.classList.contains('is-visible')){
			      showSpot.classList.remove('active');
			      mediaSpot.classList.remove('is-visible');
			    }

			    addSpot.classList.add('active');
			    scope.clearMarker();
			    markers.push(marker); 	
			};//end addMarker			

			scope.clearMarker = function (){
			   	for (var i = 0; i < markers.length; i++) {
			     	markers[i].setMap(null);
			     	markers = [];
			   	};
			};//end clearMarker			


			/*==========  Event  ==========*/

			scope.$on('$viewContentLoaded', function() {
    			scope.setMarkers(map);
  			});

  			google.maps.event.addListener(searchBox,'places_changed', scope.placesChanged);
  			google.maps.event.addListener(map,'bounds_changed', scope.boundsChanged);

			submitR.addEventListener('click', scope.buttonSearch);
			geo.addEventListener('click', scope.getLocation);
			back.addEventListener('click', scope.clearMarker);  			

			google.maps.event.addListener(map, 'click', function(e) {
			    scope.$apply(function() {
			      scope.addMarker({
			        lat: e.latLng.lat(),
			        lng: e.latLng.lng()
			      }); 
			    });
			});

		}//End Link

	};//End return
})


