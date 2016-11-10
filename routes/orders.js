var express = require('express');
var router = express.Router();
var orderService = require('../services/order-service');


/* GET home page. */
// vm stands for view model
router.get('/', function(req, res, next) {
  if(!req.isAuthenticated()){
  	res.redirect('/');
  }

  var vm = {
	title : 'Place an order',
	firstName : req.user ? req.user.firstName : null

  }
  res.render('orders/index', vm);
});

router.get('/api/restaurants',function(req,res,next){
	if(!req.isAuthenticated()){
  		res.redirect('/');
  	}
	orderService.getCollections(3,function(error,response,body){
		if(error){
			console.log(error);
			return next(error);
		}
		var vm = {
			data : JSON.parse(body)
		};

		 var json = JSON.parse(body);
		 res.json(json);
		//console.log(body.collections);
		//res.render('index',vm);
	})
});

router.get('/api/restaurants/:id',function(req,res,next){
	if(!req.isAuthenticated()){
  		res.redirect('/');
  	}

  	orderService.getRestaurants(req.params.id,function(error,response,body){
		if(error){
			console.log(error);
			return next(error);
		}
		var vm = {
			data : JSON.parse(body)
		};

		 var json = JSON.parse(body);
		 res.json(json);
		//console.log(body.collections);
		//res.render('index',vm);
	});

});

module.exports = router;
