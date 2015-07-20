'use strict';

app.factory('spotFactory', function($http, $q, $sessionStorage) {
    var factory = {
        
        getSpots : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/spots')
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });

            return deferred.promise;
        },

        getSpot : function(id){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/spots/'+id)
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });

            return deferred.promise;
        },        

        getOneMedia : function(id){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/spots/'+id+'/media')
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });

            return deferred.promise;
        },

        getCategories : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/categories')
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les categories');
            });

            return deferred.promise;
        },

        favSpot : function(id){
            var deferred = $q.defer();
            $http.post('http://08ede76110.url-de-test.ws/users/favoris/',{
                spot_id : id
            })
            .success(function(data, status){
                // console.log(data);
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les categories');
            });

            return deferred.promise;
        },

        getFavSpot : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/users/'+$sessionStorage.user.id+'/favoris')
            .success(function(data, status){           
                // console.log(data);    
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
                // console.log(data);
            });
            
            return deferred.promise;            
        },

        isFavSpot : function(data, id){
            for (var d in data) {
                // console.log(data[d]);
                // console.log(id);
                if(data[d].id == id){
                    return true;
                }
            };
        },        

        unFav : function(id){
            var deferred = $q.defer();
            $http.delete('http://08ede76110.url-de-test.ws/users/favoris/'+id)
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },

        addSpot : function(spot, files, lat, lng){
            var deferred = $q.defer();
            spot.latitude = lat;
            spot.longitude = lng;

            $http.post('http://08ede76110.url-de-test.ws/spots',{
                spot : spot,
                files : files
            })
            .success(function(data, status){
                // console.log(data);
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });

            return deferred.promise;
        }

    };
    return factory;
});