var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
   if(req.user){
   		res.redirect('/orders');
   }
   var vm = {
   		title: 'Restaurant to room service',
   		error : req.flash('error')
   }
  res.render('index', vm);
});



module.exports = router;
