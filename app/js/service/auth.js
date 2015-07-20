'use strict';

app.factory('authFactory', function($http, $sessionStorage, $location, $rootScope) {
    var factory = {

    	isLogged : function(){
    		return $sessionStorage.logged;
    	},
    
		saveUser : function (userInfo) {
            $sessionStorage.user   = userInfo[0];
            $sessionStorage.logged = true;
            $sessionStorage.token  = userInfo[0].token;
        },

        getUser : function(userInfo){
        	return $sessionStorage.user;
        },

        getToken : function(){
        	return $sessionStorage.token;
        },

        logout : function(){
            sessionStorage.clear();
            window.location.href = "/";
        },

        getValid : function(){
            return $sessionStorage.user.is_valid;
        }

    };

    return factory;
});