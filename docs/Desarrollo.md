# Desarrollo de la aplicación
## Creación del bot

- En primer lugar hay que tener un usuario en [Telegram](http://telegram.com.es/).
- Crear un bot usando [BotFather](https://core.telegram.org/bots#6-botfather).
- Buscar este bot en Telegram y escribirle `/newbot`. Una vez hecho esto te preguntará el nombre del bot, su nombre de usuario y te devolverá el token. Este token es importante puesto es requerido por la API de telegram para desarrollar nuestro propio bot.
- El siguiente paso es clonar mi repositorio: `git clone https://github.com/adritake/CC_UGR_Personal.git`
- Dentro del repositorio ejecutar `npm init`.
- Crear un documento Procfile con la siguiente linea: `web: node IssueBot.js`
- Crear el archivo *IssueBot.js* el cual contendrá la funcionalidad del bot. Para ello hay que echarle un vistazo a la [documentación de la API](https://github.com/mullwar/telebot)
- Ejecutar `npm install --save telebot` para instalar la api y guardar la dependecia en *package.json*.
- Igual con `npmi install --save express`
- Mi bot actual cuenta con una funcionalidad reducida y con una "base de datos" en el propio bot que solo sirve para esta versión y que en un futuro será actualizada por un servicio de base de datos. El código de mi bot es el siguiente:

<details><summary>IssueBot 1.0</summary>
<p>

```javascript
//IssueBot version 1.0

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
bot.on('/help', (msg) => msg.reply.text("Commands: \n /add_issue <description of the issue> to add a new issue \n/see_issues to see all the issues \n/delete_issue (this feature will be added in the next version"));


//Function to save issues
bot.on(/^\/add_issue (.+)$/, (msg, props) => {

	if(props.match[1] != ""){
		iss.addIssue(props.match[1]);
		//Send confirmation
		return bot.sendMessage(msg.from.id, "Issue added.", { replyToMessage: msg.message_is } );
	}
	
});

//Function to see the issues
bot.on('/see_issues', (msg) => {

  
	//Get the issues
	var issues = iss.getIssues();
	for(i=0; i<issues.length; i++)
		bot.sendMessage(msg.from.id, issues[i], { replyToMessage: msg.message_is } );
	
	
});

bot.start();


```
</p>
</details>




- Para desplegar la aplicación se siguen los pasos indicados en el documento [Despligue](./Despliegue.md). 

