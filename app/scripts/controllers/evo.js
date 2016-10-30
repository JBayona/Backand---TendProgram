'use strict';

/**
 * @ngdoc function
 * @name tendProgramApp.controller:EvoCtrl
 * @description
 * # EvoCtrl
 * Controller of the tendProgramApp
 */
angular.module('tendProgramApp')
  .controller('EvoCtrl', ["$scope", 'Evo', '$q', '$filter', function ($scope, Evo, $q, $filter) {

	//Filter data
	$scope.filters = ['Locomotive Number','Cause','Part','Fe','Cr','Pb','Cu','Sn','Al','Ni','Ag','Si','B','Na','Zn','TBN', 'Date', 'PPM Water','Hollín','Oxidation','MT Serie Number','Visc 40C'];
	$scope.filterByType = ['=', '>=', '<=', '>', '<'];
	$scope.filter = [];
	$scope.filterTemp = [];
	$scope.pageData = {};
	$scope.query = "";
	$scope.dateArray = {
		tolva1 : [],
		tolva2 : [],
		tolva3 : [],
		tolva4 : [],
		tolva5 : [],
		tolva6 : [],
		comp : [],
		md : []
	};
	$scope.partType = {
		tolva1 : [],
		tolva2 : [],
		tolva3 : [],
		tolva4 : [],
		tolva5 : [],
		tolva6 : [],
		comp : [],
		md : []
	};
	$scope.datePart = {
		tolva1 : [],
		tolva2 : [],
		tolva3 : [],
		tolva4 : [],
		tolva5 : [],
		tolva6 : [],
		comp : [],
		md : []
	};
	$scope.searchPage = {
		itemsPerPageOptions : [20,40,60,80,100],
		itemsPerPage: 20,
		totalRows : 0,
		currentPage : 1,
		totalList: []
	};
	$scope.params = {
		pageSize: 1000,
    pageNumber: 1,
    filter: [],
    sort: ''
	};
	var isFilterDate = 0;
	var valueDate;
	$scope.isError = false;
	var orderBy = $filter('orderBy');

	var getTotalEvoInfo = function(){
		$scope.searchPage.totalRows  = 0; //We need to clean the previous result cause we modify this info with the filter functionality
	 	$scope.searchPage.totalList = []; //also we need to clean the array cause the varibale is global and we need to add new results.
		var rows = 1000;
		var pages = 1;
		var promises = [];
		for(var i = 0; i < 4; i++){
			var promise = Evo.getEvoInfo(rows,pages).then(promiseHandler);
			promises.push(promise);
	 		pages += 1
		}	

		$q.all(promises).then(function(data){
 				$scope.$emit('totalrows', $scope.searchPage.totalRows);
		});
	};

	var promiseHandler = function(response){
		if(response.data.length > 0){
			$scope.isError = false;
			$scope.searchPage.totalRows += response.data.length;
	 		$scope.searchPage.totalList = $scope.searchPage.totalList.concat(response.data);
		}else{
			$scope.isError = true;
		}
	};

	$scope.order = function(predicate, reverse) { //We need to send the column only
  	$scope.searchPage.totalList = orderBy($scope.searchPage.totalList, predicate, reverse);
	};

	//init routines
 	getTotalEvoInfo();
 	$scope.$on('totalrows', function(e, totalRows){
 			console.log(totalRows);
	});
    
  }]);
