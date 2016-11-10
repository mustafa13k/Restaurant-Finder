var User = require('../models/user').User;
var bcrypt = require('bcrypt');

exports.addUser = function(user,next){
	var saltRounds = 10
	bcrypt.hash(user.password, saltRounds,function(err,hash){
		if(err) return next(err);
		var newUser = new User({	
			firstName : user.firstName,
			lastName : user.lastName,
			roomNumber : user.roomNumber,
			email : user.email.toLowerCase(),
			password : hash
		});

		newUser.save(function(err){
			if(err){
				return next(err);
			}
			return next(null);
		});
	});
}

exports.findUser = function(email,next){
 	User.findOne({email : email.toLowerCase()} , function(err,user){
 		// if(err){
 		// 	console.log(err);
 		// }else{
 		// 	console.log(user);
 		// }
 		next(err,user);
 	})
 }