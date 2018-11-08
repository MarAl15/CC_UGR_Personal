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


//Bot initialization
const TelegramBot = require('node-telegram-bot-api');

 
//API Token Telegram
const token = '768646003:AAEcUjONl0oSFCpP-b66YD0-sbOpd30qxsw';


//Create a bot that uses polling to get updates
const bot = new TelegramBot(token, {polling: true});
const request = require('request');
 

//start function
bot.onText(/\/start/, (msg) => {

	//message id
	const chatId = msg.chat.id;
  
	//welcome message
	bot.sendMessage(chatId, "Hi! I'm IssueBot. If you need help type: /help" );

	
});

//help function
bot.onText(/\/help/, (msg) => {

	//message id
	const chatId = msg.chat.id;
  
	//help message
	bot.sendMessage(chatId, "Commands: \n /add_issue <description of the issue> to add a new issue \n/see_issues to see all the issues \n/delete_issue (this feature will be added in the next version" );

	
});


//Function to save issues
bot.onText(/\/add_issue (.+)/, (msg, match) => {

	//message id
	const chatId = msg.chat.id;
  
	if(match[1] != ""){
		iss.addIssue(match[1]);
		//Send confirmation
		bot.sendMessage(chatId, "Issue added." );
	}
	
});

//Function to see the issues
bot.onText(/\/see_issues/, (msg) => {

	//message id
	const chatId = msg.chat.id;
  
	//Get the issues
	var issues = iss.getIssues();
	for(i=0; i<issues.length; i++)
		bot.sendMessage(chatId, issues[i]);
	
	
});



