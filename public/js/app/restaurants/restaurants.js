angular
	.module('app')
	.controller('RestaurantsController', RestaurantsController);

	RestaurantsController.$inject  = ['api'];

	function RestaurantsController(api){
		var self = this;
		api.getCollections().then(function(data){
			self.restaurants = data.collections;
			console.log(self);
		})
		// $http.get('/orders/api/restaurants')
		// 	 .then(function(response){
		// 	 	self.restaurants = response.data.collections;
		// 	 	console.log(self);
		// 	 },function(reason){
		// 	 	console.log(reason);
		// 	 })
		// 	 .catch(function(err){
		// 	 	console.log(err);
		// 	 });
	}