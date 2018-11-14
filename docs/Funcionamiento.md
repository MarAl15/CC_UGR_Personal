# FUNCIONAMIENTO
## Funcionamiento del bot de Telegram

El bot de telegram consiste en un programa en nodejs que hace uso de la [API de bots de Telegram](https://github.com/mullwar/telebot). También hace uso del nodo [Express](https://expressjs.com/es/) para que tenga la funcionalidad de un server y pueda devolver un JSON si accedemos a la ruta raíz de la aplicación mediante un explorador.

Su uso es muy simple, se le añade al bot los comandos y la función que se deberá hacer cuando reciba esos comandos. Por ejemplo la funcion `bot.on('/start', (msg) => {...});` se disparará cuando al bot le llegue un mensaje igual a "/start" y realizará lo que haya entre las llaves. En mi caso enviará un mensaje de bienvenida al usuario.

Para interactuar con el bot es necesario buscarlo en los contactos de Telegram como @cc_issue_bot y comenzar a usarlo escribiendo `/start`. El bot te indicará como debes usarlo.

