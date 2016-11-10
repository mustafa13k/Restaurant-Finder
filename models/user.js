var mongoose = require('mongoose');
var userService = require('../services/user-service');

var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName : {
		type: String,
		required : 'Please enter your first name'
	},
	lastName : {
		type: String,
		required : 'Please enter your last name'
	},
	roomNumber : {
		type: Number,
		required : 'Please enter your room number'
	},
	email : {
		type: String,
		required : 'Please enter your email address'
	},
	password : {
		type: String,
		required : 'Please enter your password'
	},
	created : {type : Date , default: Date.now}
});

// userSchema.path('email').validate(function(err){
// 	console
// });
	
// userSchema.pre('save',function(next){
// 	userService.findUser(this.email);
// 	//next();
// });

userSchema.path('email').validate(function(value,respond){
	userService.findUser(value,function(err,user){
		if(err){
			console.log(err);
			respond(false);
		}else{
			//console.log(!user);
			respond(!user);
		}
	});
},'That email is already in use');


var User = mongoose.model('User',userSchema);
//console.log(User);

module.exports = {
	User: User
};