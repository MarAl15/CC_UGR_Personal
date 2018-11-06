# Desarrollo de la aplicación
## Creación del bot

- En primer lugar hay que tener un usuario en [Telegram](http://telegram.com.es/).
- Crear un bot usando [BotFather](https://core.telegram.org/bots#6-botfather).
- Buscar este bot en Telegram y escribirle `/newbot`. Una vez hecho esto te preguntará el nombre del bot, su nombre de usuario y te devolverá el token. Este token es importante puesto es requerido por la API de telegram para desarrollar nuestro propio bot.
- El siguiente paso es clonar mi repositorio: `git clone https://github.com/adritake/CC_UGR_Personal.git`
- Dentro del repositorio ejecutar `npm init`.
- Crear un documento Procfile con la siguiente linea: `web: node IssueBot.js`
- Crear el archivo *IssueBot.js* el cual contendrá la funcionalidad del bot. Para ello hay que echarle un vistazo a la [documentación de la API](https://github.com/yagop/node-telegram-bot-api)
- Ejecutar `npm install --save node-telegram-bot-api` para instalar la api y guardar la dependecia en *package.json*.
- Igual con `npmi install --save express`
- Mi bot actual cuenta con una funcionalidad reducida y con una "base de datos" en el propio bot que solo sirve para esta versión y que en un futuro será actualizada por un servicio de base de datos. El código de mi bot es el siguiente:

<details><summary>IssueBot 1.0</summary>
<p>

```javascript
//IssueBot version 1.0

//Inicialización de la parte de Webapp
var express = require('express');
var app = express();
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

```
</p>
</details>




- Para desplegar la aplicación se siguen los pasos indicados en el documento [Despligue](./Despliegue.md). 

