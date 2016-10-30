'use strict';

/**
 * @ngdoc service
 * @name tendProgramApp.evo
 * @description
 * # evo
 * Service in the tendProgramApp.
 */
angular.module('tendProgramApp')
  .service('Evo', ['Proxy', 'Backand' , function (Proxy, Backand) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    console.log(Backand.getApiUrl());
    self = this;

    this.getEvoInfo = function(page,numberPage){
    	var params = {
    		pageNumber : numberPage ? numberPage : 1,
    		pageSize : page ? page : 20
    	};
    	return Proxy.getCall(Backand.getApiUrl() + '/1/objects/evo_fleet', params);
    };

  }]);
