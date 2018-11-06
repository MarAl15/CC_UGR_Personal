

//Inicialización de la parte de Webapp
var express = require('express');
var app = express();
module.exports = app
app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send({"status": "OK"});
});

app.listen(app.get('port'), function () {
  console.log('Example app listening on port ' + app.get('port'));
});


//Inicialización de la parte del bot
const TelegramBot = require('node-telegram-bot-api');

 
//API Token Telegram
const token = '768646003:AAEcUjONl0oSFCpP-b66YD0-sbOpd30qxsw';

//Creamos un bot que usa 'polling'para obtener actualizaciones
const bot = new TelegramBot(token, {polling: true});
const request = require('request');
 

// "Base de datos"
var issues = [];

// Numero de issue
var nIssue = 0;


//Función start
bot.onText(/\/start/, (msg) => {

	//Id del mensaje
	const chatId = msg.chat.id;
  
	//Mensaje de bienvenida
	bot.sendMessage(chatId, "Hi! I'm IssueBot. If you need help type: /help" );

	
});

//Funcion help
bot.onText(/\/help/, (msg) => {

	//Id del mensaje
	const chatId = msg.chat.id;
  
	//Mensaje de bienvenida
	bot.sendMessage(chatId, "Commands: \n /add_issue <description of the issue> to add a new issue \n/see_issues to see all the issues \n/delete_issue (this feature will be added in the next version" );

	
});


//Funcion para guardar issues
bot.onText(/\/add_issue (.+)/, (msg, match) => {

	//Id del mensaje
	const chatId = msg.chat.id;
  
	if(match[1] != ""){
		//Incrementamos el numero de issue
		nIssue += 1;
		//Issue a guardar
		const resp = "#" + nIssue + " " + match[1]; 
		//Almacenamos el issue
		issues = issues.concat(resp);
		//Enviar confirmación
		bot.sendMessage(chatId, "Issue #" + nIssue + " added." );
	}
	
});

//Funcion para ver los issues
bot.onText(/\/see_issues/, (msg) => {

	//Id del mensaje
	const chatId = msg.chat.id;
  
	for(i=0; i<issues.length; i++)
		bot.sendMessage(chatId, issues[i]);
	
	
});


