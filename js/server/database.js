/*
 * 	Database 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

/*	Global	*/
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;

mongoose.connect('mongodb://localhost/db');

/*	Schemas	*/
var playerSchema = new mongoose.Schema({
	price: Number,
	stats: {ATK:Number,TEC:Number,DEF:Number},
	name: String,
	image: String
});

var teamSchema = new mongoose.Schema({
	price: Number,
	stats: {ATK:Number,TEC:Number,DEF:Number},
	name: String,
	image: String
});

var leagueSchema = new mongoose.Schema({
	fixture: [{
		date:{ type: Date, default: Date.now },
		matches: [{
			local: {score:Number,user:{ type: ObjectId, ref: 'User'}},
			visitor: {score:Number,user:{ type: ObjectId, ref: 'User'}},
			date: { type: Date, default: Date.now } 
		}]			
	}]
});

var userSchema = new mongoose.Schema({
	email: {type:String, required:true, unique:true},
	password: {type:String, required:true},
	admin: { type: Boolean, default: false },
	player: { type: ObjectId, ref: 'Player'},
	team: { type: ObjectId, ref: 'Team'}
});

var logSchema = new mongoose.Schema({
	type: String,
	date: { type: Date, default: Date.now },
	serviceId: String,
	data: String,
	user: String
});

/*	Models	*/
exports.League = mongoose.model('League', leagueSchema);
exports.User = mongoose.model('User', userSchema);
exports.Player = mongoose.model('Player', playerSchema);
exports.Team = mongoose.model('Team', teamSchema);

var Log = mongoose.model('Log', logSchema);


/* Methods */
//INSERT

function log(type, serviceExecution){
	if(serviceExecution.serviceId != 'getLog')
		new Log({type:type, user:serviceExecution.user.email, serviceId: serviceExecution.serviceId, data : JSON.stringify(serviceExecution.data)})
	.save();
}

function getLog(then){
	Log.find().
	sort({ date: -1 }).
	limit(100).
	exec(then);
}




/* Exports */

//User
exports.log = log;
exports.getLog = getLog;