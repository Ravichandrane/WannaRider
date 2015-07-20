'use strict';

app.factory('usersFactory', function($http, $q, $sessionStorage) {
    var factory = {
        getUsers : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/users?limit=20')
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },

        getOneUser : function(id){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/users/'+id)
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                // console.log(data);
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },        

        follow : function(id){
            var deferred = $q.defer();
            $http.post('http://08ede76110.url-de-test.ws/users/follows/',{
                user_follow : id
            })
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        },


        getFollow : function(){
            var deferred = $q.defer();
            $http.get('http://08ede76110.url-de-test.ws/users/'+$sessionStorage.user.id+'/follows')
            .success(function(data, status){
               //console.log(data);                    
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
                // console.log(data);
            });
            
            return deferred.promise;
        },

        isFollow : function(data, id){
            for (var d in data) {
                if(data[d].id == id){
                    return true;
                }
            };
        },

        unfollow : function(id){
            var deferred = $q.defer();
            $http.post('http://08ede76110.url-de-test.ws/users/unfollows/',{
                user_follow : id
            })
            .success(function(data, status){
                deferred.resolve(data);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            
            return deferred.promise;
        }        

    };

    return factory;
});