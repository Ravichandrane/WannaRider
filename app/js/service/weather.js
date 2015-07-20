'use strict';

app.factory('weatherFactory', function($http, $q, authFactory) {
    var factory = {
        getWeather : function(lat,lng){
            $http.defaults.headers.common.Authorization = undefined;
            var deferred = $q.defer();
            $http.get('API_WEATHER_URL')
            .success(function(data, status){
                factory.weather = data;
                deferred.resolve(factory.weather);
            })
            .error(function(data, status){
                deferred.reject('Impossible de récupèrer les données pour le moment');
            });
            $http.defaults.headers.common.Authorization = authFactory.getToken();
            return deferred.promise;
        }
    };
    return factory;
});

