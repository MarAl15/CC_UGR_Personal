//Creating the log system
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const logger = createLogger({
  level: 'info',
	format: combine(
    timestamp(),
    prettyPrint()
  ),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log`
    // - Write all logs error (and below) to `error.log`.
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' })
  ]
});
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'production') {
  logger.add(new transports.Console({
    format: format.simple()
  }));
}



//Webapp initialization
var express = require('express');
var app = express();

//Import the IssueManager
const IssueManager = require('./IssueManager');
var iss = new IssueManager();


//Seting the ports to the app
var port = process.env.PORT || 5000;
app.set('port', port);
app.use(express.static(__dirname + '/public'));



//Adding functions to the app
app.get('/', function (req, res) {

	var n = iss.getNIssues();
	var msg = {
   			"status": "OK",
   			"ejemplo": {
				    "ruta": "/see_issues",
                		    "valor": { "size" : n }
				   }
		   }
	res.send(msg);
});


app.get('/see_issues/:id', function (req, res) {

	var issues = iss.getIssues(req.params.id);
	var resjson = { "size" : issues.length };
	if( issues.length > 0 )
		for( i = 0; i < issues.length; i++ )
			resjson["Issue #" + (i+1)] = issues[i];
	else {
		logger.info("No issues for the requeste")
	}


	res.send(resjson);

});





//Start the app
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
	logger.info('App listening on port ' + app.get('port'));
});

module.exports = server


//============== Bot part ==============

//API Token Telegram
const token = '768646003:AAEcUjONl0oSFCpP-b66YD0-sbOpd30qxsw';

//Create a bot
const TeleBot = require('telebot')
const bot = new TeleBot(token);
//const request = require('request');


//start function
bot.on('/start', (msg) => msg.reply.text("Hi! I'm IssueBot. If you need help type: /help"));

//help function
bot.on('/help', (msg) => msg.reply.text("Commands: \n /add <description of the issue> to add a new issue \n/see to see all the issues \n/delete <issue_id> to delete the issue"));


//Function to save issues
bot.on(/^\/add (.+)$/, (msg, props) => {

	if(props.match[1] != ""){
		iss.addIssue(msg.chat.id, props.match[1]);
		//Send confirmation
		return bot.sendMessage(msg.chat.id, "Issue added.", { replyToMessage: msg.message_is } );
	}
	else {
		logger.warn("No issue added for the chat id " + msg.chat.id);
	}

});

//Function to see the issues
bot.on('/see', (msg) => {


	//Get the issues
	var issues = iss.getIssues(msg.chat.id);
	if(issues.length == 0)
		logger.info("No issues for the chat id " + msg.chat.id);

	for(i=0; i<issues.length; i++)
		bot.sendMessage(msg.chat.id, '#' + i + ' ' + issues[i], { replyToMessage: msg.message_is } );


});


//Function to delete the issue
bot.on(/^\/delete (.+)$/, (msg, props) =>{
	var iss_id = parseInt(props.match[1]);


	if(iss_id+1){	//To make sure tha it is a number. (+ 1) to make the value 0 true.
		iss.deleteIssue(msg.chat.id, iss_id);
		bot.sendMessage(msg.chat.id, "Issue #" + iss_id + " deleted.", { replyToMessage: msg.message_is } );
	}
	else{
		bot.sendMessage(msg.chat.id, "Use: /delete <issue_id>", { replyToMessage: msg.message_is } );
		logger.warn("No issue was deleted for chat id " + msg.chat.id);
	}
});


bot.start();
