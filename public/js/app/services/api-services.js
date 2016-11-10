(function(){
	'use strict';

	angular
		.module('app')
		.factory('api',apiFactory);

	apiFactory.$inject = ['$http'];

	function apiFactory($http){
		return {
			getCollections: getCollections
		};

		function getCollections(){
			return $http.get('/orders/api/restaurants')
				.then(function(response){
					return response.data;
				})
		}

		function getRestaurants(restId){
			return $http.get('orders/api/restaurants' + restId)
				.then(function(response){
					return response.data;
				})
		}

	}

		

}());