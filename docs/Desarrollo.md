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

```python
//IssueBot version 1.0
#!/usr/bin/env python


from telegram import (ReplyKeyboardMarkup, ReplyKeyboardRemove)
from telegram.ext import (Updater, CommandHandler, MessageHandler, Filters, RegexHandler,
                          ConversationHandler)

import logging

# Enable logging
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

logger = logging.getLogger(__name__)

NIssues = 0
Issues = list()

def start(bot,update):
	update.message.reply_text("Hi! I'm IssueBot. Please use /help to see the commands")

def help(bot,update):
	update.message.reply_text("Commands:\n /add_issue <description of the issue> to add a new issue.\n /see_issues to see all the issues.\n /delete_issue (this feature will be added in the next version)")
	
def addIssue(bot,update,args):
	global NIssues
	if len(args) >= 1:
		NIssues += 1
		str_iss = "#" + str(NIssues)
		for a in args:
			str_iss = str_iss + " " + a
		Issues.append(str_iss)
		update.message.reply_text("Issue #" + str(NIssues) + " added.")
	else:
		update.message.reply_text("Use: /add_issue <description of the issue>")


def seeIssues(bot,update):
	for iss in Issues:
		update.message.reply_text(iss)

def getUpdates():
	return "hola"

def main():
	"""Run bot."""
	updater = Updater("768646003:AAEcUjONl0oSFCpP-b66YD0-sbOpd30qxsw")

	# Get the dispatcher to register handlers
	dp = updater.dispatcher

	# on different commands - answer in Telegram
	dp.add_handler(CommandHandler("start", start))
	dp.add_handler(CommandHandler("help", help))
	dp.add_handler(CommandHandler("add_issue", addIssue, pass_args=True))
	dp.add_handler(CommandHandler("see_issues", seeIssues))
  

	# Start the Bot
	updater.start_polling()

	# Block until you press Ctrl-C or the process receives SIGINT, SIGTERM or
	# SIGABRT. This should be used most of the time, since start_polling() is
	# non-blocking and will stop the bot gracefully.
	updater.idle()


if __name__ == '__main__':
	main()	

```
</p>
</details>

Para preparar la aplicación para heroku se han seguido los siguientes pasos:

- Se ha creado una carpeta donde se almacenarán los archivos, yo la he llamado Despliegue.
- Instalar virtualenv `pip install virtualenv`
- Dentro de Despliegue ejecutar `virtualenv my_env`
- Dentro de Despliegue clonar el repositorio (hasta ahora no tenía ningun archivo de configuración) `git clone git clone https://github.com/adritake/CC_UGR_Personal.git`
- Copiar el código anteriormente indicado en un archivo llamado _IssueBot.py_ dentro del repositorio.
- En *my_env* ejecutar `source bin/activate`, ahora debería aparecer (my_env) en la línea de órdenes.
- Vamos al repositorio
- Ejecutamos `pip install python-telegram-bot --upgrade` para instalar la API de Telegram.
- Para guardar las dependencias ejecutamos `pip freeze > requirements.txt`.
- Creamos un archivo llamado Procfile en el que se incluirá la siguiente línea: `web: python IssueBot.py`.
- Creamos el archivo *__init.py*.
- Ahora inicializamos el repositorio:
	* git init
	* git add .
	* git commit -am "mensaje descriptivo"
	* git push https://github.com/adritake/CC_UGR_Personal.git
- Para desplegar la aplicación se siguen los pasos indicados en el documento [Despligue](./Despliegue.md). 

