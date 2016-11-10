var request = require('request');
var config  = require('../config');


exports.getCollections = function(cityId,next){
	request({
		url: config.apiUrl, //URL to hit
	    // qs: {from: 'blog example', time: +new Date()}, //Query string data
	    qs: { city_id : cityId },
	    //json:true,
	    method: 'GET', //Specify the method
	    headers: { //We can define headers too
	    	"Accept": "application/json",
	        'user-key': config.apiKey
	    }
	},function(error,response,body){
		next(error,response,body);
	});
}

exports.getRestaurants = function(collection_id,next){
	request({
		url : 'https://developers.zomato.com/api/v2.1/search',
		qs  : { entity_id: 3, collection_id : collection_id },
		method : 'GET',
		headers: { //We can define headers too
	    	"Accept": "application/json",
	        'user-key': config.apiKey
	    }
	},function(error,response,body){
		next(error,response,body);
	});
}

