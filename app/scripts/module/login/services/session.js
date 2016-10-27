'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.Session
 * @description
 * # Session
 * Service in the tendProgramApp.
 */
angular.module('login')
  .service('Session', ['$location', '$rootScope', 'localStorageService', 'Proxy', 'Backand', function ($location, $rootScope, localStorageService, Proxy, Backand) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    self = this;

    self.setSession = function(session){
    	console.log(session);
    	if(session){
    		$rootScope.session = session; 
        	localStorageService.set('jac-session',session); 
    	}
    };

    self.setAttribute = function(attribute,value){
      $rootScope.session[attribute] = value;
    };

    self.saveSession = function(){
      localStorageService.set('jac-session',$rootScope.session); 
    };

    self.getSession = function(){
        var session = localStorageService.get('jac-session');
        if(session){
          $rootScope.session = session;
        }
        return session ? $rootScope.session : undefined;
    };

    self.hasSession = function(){
        var session = self.getSession();
        return session ? true : false;
    };

    self.logout = function(){
    	Backand.signout().then(function(response){
    		localStorageService.remove('jac-session');
    		$rootScope.session = null;
    		$location.path('/login');
    	})
    }

  }]);
