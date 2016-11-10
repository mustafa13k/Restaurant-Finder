module.exports = function(){
	var passport = require('passport');
	var passportLocal = require('passport-local').Strategy;
	var userService = require('../services/user-service');
	var bcrypt = require('bcrypt');


	// we can use usernameField and pass as object to localStrategy
	passport.use(new passportLocal({usernameField: 'email'},function(email,password,done){
		userService.findUser(email,function(err,user){
			if(err){
				return done(err);
			}
			if(!user){
				return done(null, false, { message: 'Incorrect email.' });
			}
			//console.log(user);
			bcrypt.compare(password, user.password,function(err,same){
				if(err){
					return done(err);
				}
				if(!same){
					return done(null,false,{ message: 'Incorrect password.' });
				}
				done(null,user);
			});
			// if(password != user.password){
			// 	return done(null, false, { message: 'Incorrect password.' });
			// }
			
		});
	}));

	passport.serializeUser(function(user,done){
		done(null,user.email);
	});

	passport.deserializeUser(function(email,done){
		userService.findUser(email,function(err,user){
			done(err,user);
		});
	});

}