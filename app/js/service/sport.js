'use strict';

app.factory('sportsFactory', function($http, $q, $sessionStorage) {
    var factory = {
        
        getSports : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/sports')
            .success(function(data, status){
                console.log(data);
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        }, 

        check : function(id){
            var deferred = $q.defer();
            $http.post('http://08ede76110.url-de-test.ws/users/sport/',{
                sport_id : id
            })
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },

        unCheck : function(id){
            var deferred = $q.defer();
            $http.delete('http://08ede76110.url-de-test.ws/users/sport/'+id)
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },

        isSport : function(data, id){
            for (var d in data) {
                // console.log(data[d]);
                // console.log(id);
                if(data[d].id == id){
                    return true;
                }
            };
        },

        isValid : function(){
            var deferred = $q.defer();
            $http.post('http://08ede76110.url-de-test.ws/users/' + $sessionStorage.user.id,{
                is_valid : 1
            })
            .success(function(data, status){
                $sessionStorage.user.is_valid = 1;
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