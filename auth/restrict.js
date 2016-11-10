// Middleware route for restricting access

module.exports = function(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/');
}