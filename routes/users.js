var express = require('express');
var router = express.Router();
var userService = require('../services/user-service');
var passport = require('passport');
var util = require('util');
var config = require('../config');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/create',function(req,res,next){
	var vm = {
		title : ' Some title'
	}
    res.render('users/create',vm);
});


router.post('/login',
	function(req,res,next){
		if(req.body.remember_me){
			req.session.cookie.maxAge = config.cookieMaxAge;
		}
		next();
	},
	passport.authenticate('local',{
		failureRedirect : '/',
		successRedirect : '/orders',
		failureFlash: true
	}),
	function(req,res,next){
		// console.log("Request : " + req);
		//console.log(util.inspect(req.user, {showHidden: false, depth: null}))
		//res.redirect('/orders',vm);
	}
);

router.post('/create',function(req,res,next){

	userService.addUser(req.body,function(err){
		if(err){
			//console.log(err);
			var vm = {
				title : 'Create an account',
				input : req.body,
				error : err
			}

			// console.log(vm);
			delete vm.input.password;
			return res.render('users/create',vm);
		}
		req.login(req.body, function(err) {
		  if (err) { return next(err); }
		  return res.redirect('/orders');;
		});
		
		//req.login()
	});


	
});

router.get('/logout',function(req,res,next){
	req.logout();
	req.session.destroy();
	res.redirect('/');
});


module.exports = router;
