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


app.get('/see_issues', function (req, res) {

	var issues = iss.getIssues();
	var resjson = { "size" : issues.length };
	if( issues.length > 0 )
		for( i = 0; i < issues.length; i++ )
			resjson["Issue #" + (i+1)] = issues[i];


	res.send(resjson);

});





//Start the app
var server = app.listen(app.get('port'), function () {
  console.log('App listening on port ' + app.get('port'));
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

});

//Function to see the issues
bot.on('/see', (msg) => {


	//Get the issues
	var issues = iss.getIssues(msg.chat.id);
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
	else
		bot.sendMessage(msg.chat.id, "Use: /delete <issue_id>", { replyToMessage: msg.message_is } );

});


bot.start();
