'use strict';

var app = angular.module('RiderApp', ['ngSanitize','ngResource','ngRoute','ngStorage','angularFileUpload']);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/',{
        templateUrl: 'views/_home.html',
      })
      .when('/sport',{
        templateUrl: 'views/_sport.html',
        controller: 'sportCtrl',
        auth : true
      })
      .when('/follow',{
        templateUrl: 'views/_follow.html',
        controller: 'followCtrl',
        auth : true
      })
      .when('/map',{
        templateUrl: 'views/_main.html',
        controller: 'mainCtrl',
        auth : true
      })
       .when('/dashboard/:userName/:userLastname',{
        templateUrl: 'views/_profil.html',
        controller: 'dashCtrl',
        auth : true
      })
      .when('/users/:userName/:userLastname/:userId',{
        templateUrl: 'views/_users.html',
        controller: 'usersCtrl',
        auth : true
      })
      .when('/search',{
        templateUrl: 'views/_search.html',
        controller: 'searchCtrl2',
        auth : true
      })
      .otherwise({
        redirectTo: '/map'
      });
});


app.run(function($http, $rootScope, $localStorage, $sessionStorage, $location, authFactory) {
  $rootScope.$on( "$routeChangeStart", function(event, next, current) {

    if(next.auth == true){
      if (authFactory.isLogged() == true) {
        $http.defaults.headers.common.Authorization = authFactory.getToken();
      }else{
        $location.path('/');
      }

      if(authFactory.getValid() == 1 && $location.path() == '/sport'){
        $location.path('/map');
      }else if(authFactory.getValid() == 1 &&  $location.path() == '/follow' ){
        $location.path('/map');
      }

    }

  });

});

app.filter('capitalize', function() {
  
  return function(input, scope) {
    if (input!=null){
      input = input.toLowerCase();
    }
    return input.substring(0,1).toUpperCase()+input.substring(1);
  }

});





