var db = require('./js/server/database');
console.log('-----running test-----\n\n\n');



db.User.findOne({email:'jibadano@gmail.com'}, function(err,user){
	db.Poll.find({},function(err,polls){
			polls.forEach(function(poll){
				poll.owner = user;
				poll.save();
			})
		});
});





