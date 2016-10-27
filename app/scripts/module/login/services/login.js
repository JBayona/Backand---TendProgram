'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.login
 * @description
 * # login
 * Service in the tendProgramApp.
 */
angular.module('login')
  .service('LoginService', ['$q','Proxy', 'Backand', function ($q, Proxy, Backand) {
    // AngularJS will instantiate a singleton by calling "new" on this function

    //Login calls
    var login = function(username,password){
    	var defer = $q.defer();
    	var username = username;
    	var password = password;

    	//App Name
    	Backand.setAppName('tendapp');
    	Backand.signin(username, password).then(function(data){
    		defer.resolve(data);
    	},function(data, status, header, config){
    		console.log('Error = ' + data);
    		defer.reject(data);
    	});
    	return defer.promise;
    };

    return{
    	login:login
    }

  }]);
