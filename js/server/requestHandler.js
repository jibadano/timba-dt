/*
 * 	Request Handler 0.0.1
 *
 *	jibadano@gmail.com
 *	Date: 2015-11-24
 */

var db = require('./database');
var eh = require('./errorHandler');
var atob = require('atob');
var mail = require('./mail');


/********************************************************************
************************** Config & Init ****************************
*********************************************************************/

var config = {startDate: new Date(), matchDelay:30, roundDelay:30, roundsPerMatch:9, matchsPerDay:99};
var league = {
	table: [{"username":"u2@gmail.com","teamname":"Barcelona","teamprice":10,"points":0,"played":0,"won":0,"lost":0,"draw":0,"gf":0,"gc":0},{"username":"u1@gmail.com","teamname":"Barcelona","teamprice":10,"points":0,"played":0,"won":0,"lost":0,"draw":0,"gf":0,"gc":0},{"username":"jibadano@gmail.com","teamname":"Barcelona","teamprice":10,"points":0,"played":0,"won":0,"lost":0,"draw":0,"gf":0,"gc":0}],
	fixture:[],
	playing:false
}

function addMatch(date,local,visitor){
	var match = {date:date,local:{score:0,user:local}, visitor:{score:0,user:visitor},rounds:[]};
	league.fixture.push(match);
}

function calculateFixture(){
	var startDate = new Date(config.startDate);
	for(var i=0;i<league.table.length;i++){
		for(var j=i+1;j<league.table.length;j++){
			addMatch(new Date(startDate),league.table[i],league.table[j]);
			startDate.setMinutes(startDate.getMinutes() + config.matchDelay);
		}
	}
}

function run(){
	nextMatch(0);
}

function nextMatch(i){
	if(i<league.fixture.length){
		var match = league.fixture[i];
		var now = new Date();

		var wait = match.date.getTime() - now.getTime();
		console.log('wait: ' + wait);
		setTimeout(function(){
			getMatchTeams(match,function(localTeam,visitorTeam){
				console.log('localteam: ' + localTeam.name);
				playRound(match,localTeam,visitorTeam);
			});
			nextMatch(++i);
		},wait);
	}
}

function playRound(match,localTeam, visitorTeam){
	console.log('round: ' + match.rounds.length);
	if(match.rounds.length == 0)
		match.live = true;
	if( match.rounds.length < config.roundsPerMatch){
		setTimeout(function(){
			var position = playStats(localTeam.stats.TEC,visitorTeam.stats.TEC);
			console.log('pos: '+ position);
			var round = {};
			if(position=='local')
				round = {position:match.local.user.username};
			else
				round = {position:match.visitor.user.username};
			
			match.rounds.push(round);
			setTimeout(function(){
				if(position=='local'){
					var winner = playStats(localTeam.stats.ATK,visitorTeam.stats.DEF);
					if(winner=='local'){
						console.log('gol');
						round.goal = match.local.user.username;
						match.local.score++;
					}
					else
						round.defended = match.visitor.user.username;
				}
				else{
					var winner = playStats(localTeam.stats.DEF,visitorTeam.stats.ATK);
					if(winner=='visitor'){
						console.log('gol');
						round.goal = match.visitor.user.username;
						match.visitor.score++;
					}
					else
						round.defended = match.local.user.username;
				}
				
				playRound(match,localTeam,visitorTeam);
			},config.roundDelay*1000);
		},config.roundDelay*1000);
	}
	else{
		match.live = false;
		var localEntry = getTableEntry(match.local.user.username);
		var visitorEntry = getTableEntry(match.visitor.user.username);

		localEntry.played++;
		localEntry.gf += match.local.score;
		localEntry.gc += match.visitor.score;

		visitorEntry.played++;
		visitorEntry.gf += match.visitor.score;
		visitorEntry.gc += match.local.score;

		if(match.local.score > match.visitor.score){
			localEntry.points += 3;
			localEntry.won++;
			visitorEntry.lost++;
		}

		if(match.local.score < match.visitor.score){
			visitorEntry.points += 3;
			visitorEntry.won++;
			localEntry.lost++;
		}

		if(match.local.score == match.visitor.score){
			visitorEntry.points++;
			localEntry.points++;
			visitorEntry.draw++;
			localEntry.draw++;
		}
	}
}

function playStats(l,v){
	var total = l + v;
	var result = Math.floor(Math.random() * total) + 1;
	if(l >= result)
		return 'local';
	else
		return 'visitor';
}

function getMatchTeams(match,then){
	db.Team.findOne({name:match.local.user.teamname},function(err,localTeam){
		db.Team.findOne({name:match.visitor.user.teamname},function(err,visitorTeam){
			then(localTeam,visitorTeam);
		})
	})
}

/********************************************************************
***************************** Services ******************************
*********************************************************************/

var services = {



// 1.  USERS

//ADD USER
addUser : function (se, then){
	new db.User(se.data.user).save(then);
},

//DEL USER
delUser : function (se, then){
	db.User.findOneAndRemove(se.data.user,then);
},

//UPD USER
updUser : function (se, then){
	db.User.findOne(se.user, function(err,user){
		if(err)
			return then(err,null);

		if(!user)
			return then(eh.USER.NOT_FND,null);
		
		user = se.data.user;
		user.save(then);
	});
},

//GET USERS
getUsers : function (se, then){
	if(se.user.admin)
		db.User.find().
		sort({ email: 1 }).
		exec(then);
},

// 2. ABM TEAM

//ADD TEAM
addTeam : function (se, then){
	new db.Team(se.data.team).save(then);
},

//DEL TEAM
delTeam : function (se, then){
	db.Team.findOneAndRemove(se.data.team,then);
},

//UPD TEAM
updTeam : function (se, then){
	db.Team.findOne({_id:se.data.team._id}, function(err,team){
		if(err)
			return then(err, null);

		if(!team)
			return then(eh.USER.NOT_FND, null);
		
		team.stats =  se.data.team.stats;
		team.name =  se.data.team.name;
		team.price = se.data.team.price;
		team.image = se.data.team.image;
		team.save(then);
	});
},

//GET TEAMS
getTeams : function (se, then){
	db.Team.find().
	sort({ name: 1 }).
	exec(then);
},


// 3. ABM PLAYER

//ADD PLAYER
addPlayer : function (se, then){
	new db.Player(se.data.player).save(then);
},

//DEL PLAYER
delPlayer : function (se, then){
	db.Player.findOneAndRemove(se.data.player,then);
},

//UPD PLAYER
updPlayer : function (se, then){
	db.Player.findOne({_id: se.data.player._id}, function(err,player){
		if(err)
			return then(err, null);

		if(!player)
			return then(eh.USER.NOT_FND, null);
		
		player.stats =  se.data.player.stats;
		player.name =  se.data.player.name;
		player.price = se.data.player.price;
		player.image = se.data.player.image;
		player.save(then);
	});
},

//GET PLAYERS
getPlayers : function (se, then){
	db.Player.find().
	sort({ name: 1 }).
	exec(then);
},


//GET LOGS
getLog : function (se, then){
	db.getLog(then);
},


selectTeam: function(se,then){
	if(se.data.team){
		var entry = getTableEntry(se.user.email);
		if(entry)
			entry.teamname = se.data.team.name;
		else{
			entry = {username:se.user.email, teamname:se.data.team.name, teamprice:se.data.team.price,points:0,played:0,won:0,lost:0,draw:0,gf:0,gc:0};
			league.table.push(entry);
		}
	}
	else{
		removeTableEntry(se.user.email);		
	}
	then(null,league);

},

startLeague: function(se,then){
	if(se.data.config)
		config = se.data.config;
	calculateFixture();
	run();
	league.playing = true;
	then(null,league);
}


//SERVICES END
}

















/********************************************************************
************************** Global Services **************************
*********************************************************************/

/*
*								LOGIN
*/
function login(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);

	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));

	var email = auth.split(':')[0];
	var password = auth.split(':')[1];

	db.User.findOne({email:email, password:password}, function(err, user) {
		if(err)
			return res.end(JSON.stringify({err: eh.DATABASE(err)}));

		if(!user)
			return res.end(JSON.stringify({err: eh.USER.AUTH_FAILED}));

		req.session.user = user;
		req.session.user.password = null;
		res.end(JSON.stringify({user:req.session.user}));
	});
}

/*
*								LOGOUT
*/
function logout(req, res) {
	delete req.session.user;
	res.end('{}');
}


/*
*							FORGOT PASSWORD
*/
function forgotPassword(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);

	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));

	var email = auth.split(':')[0];

	db.User.find({email:email}, function(err, user) {
		if(err)
			return res.end(eh.DATABASE(err));

		if(!user)
			return res.end(eh.USER.AUTH_FAILED);

		mail.send(user.email,'forgot password','user: ' + user.email + ' password: ' + user.password);
		res.end();
	});
}


/*
*								SIGN UP
*/
function signUp(req, res) {
	if(req.session.user)
		return res.end(eh.USER.ALRDY_LOGGED_IN);

	var enc_auth = req.headers.authorization;
	var auth = atob(enc_auth.substring(6,enc_auth.length));

	var email = auth.split(':')[0];
	var password = auth.split(':')[1];

	var usr = {email: email, password: password};

	new db.User(usr).save(function(err,user){
		if(err)
			res.end(JSON.stringify(err));
			
		if(user){
			res.end(JSON.stringify(user));
			mail.send(user.email,'Welcome!!!!!','user: ' + user.email + ' password: ' + user.password);
		}
	});

}


/*
*						GET CURRENT USER
*/
function user(req, res){
	if(req.session.user)
		res.end(JSON.stringify({user:req.session.user}));
	else
		res.end('{}');
}

function getLeague(req, res){
	if(league)
		res.end(JSON.stringify({league:league}));
	else
		res.end('{}');
}

function getConfig(req,res){
	if(config)
		res.end(JSON.stringify({config:config}));
	else
		res.end('{}');
}

function getTeams(req, res){
	db.Team.find().
	sort({ name: 1 }).
	exec(function(err,teams){
		if(err)
			res.end(eh.DATABASE(err));
		else
			res.end(JSON.stringify({teams:teams}));
	});
}

function getMatch(req, res){
	getData(req, function(data){
		if(data.matchIdx >= 0)
			res.end(JSON.stringify({data:{match:league.fixture[data.matchIdx]}}));
		else
			res.end(JSON.stringify({err:{msg:'no match found', code:'NO_MATCH_FOUND'}}));
	});
}


/*
*								EXEC SERVICE
*/
function exec(req, res) {
	getData(req, function(serviceExecution){
		try{
			//chequeo sesion
			if(!req.session.user){
				serviceExecution.err = eh.USER.SESSION_EXPIRED;
				return res.end(JSON.stringify(serviceExecution));
			}

			serviceExecution.user = req.session.user;
			
			//log REQUEST
			db.log("REQUEST",serviceExecution);
			services[serviceExecution.serviceId](serviceExecution, function(err, data){
				serviceExecution.data = data;
				serviceExecution.err = getError(err);

				//Log RESPONSE
				db.log("RESPONSE",serviceExecution);
				res.end(JSON.stringify(serviceExecution));
			});
		}
		catch(e){
			delete serviceExecution.data;
			serviceExecution.err = eh.SERVICE_EXECUTION(e, serviceExecution.serviceId);
			db.log("RESPONSE",serviceExecution);
			res.end(JSON.stringify(serviceExecution));
		}
	});
}













/********************************************************************
****************************** Private ******************************
*********************************************************************/

var getData = function(req, then){
	var data = '';
	req.on('data', function(chunk){
		 data+=chunk;
	 });

	req.addListener('end',function (){
		try{
			then(JSON.parse(data));
		}catch(e){console.log(e)};
	});
}

var getError = function(err){
	if(!err)
		return null;
	else
		return (err.code)? err : eh.DATABASE(err);
}


var getTableEntry = function(username){
	return league.table.find(function(entry){
		return entry.username == username;
	})
}

var removeTableEntry = function(username){
	var idx = league.table.findIndex(function(entry) {
		return entry.username == username;
	});
	if(idx > -1)
		league.table.splice(idx,1);
}
/********************************************************************
****************************** Exports ******************************
*********************************************************************/


exports.logout = logout;
exports.login = login;
exports.exec = exec;
exports.user = user;
exports.forgotPassword = forgotPassword;
exports.signUp = signUp;
exports.getLeague = getLeague;
exports.getTeams = getTeams;
exports.getConfig = getConfig;
exports.getMatch = getMatch;


