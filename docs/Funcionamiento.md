# FUNCIONAMIENTO
## Funcionamiento del bot de Telegram

El bot de telegram consiste en un programa en nodejs que hace uso de la [API de bots de Telegram](https://github.com/yagop/node-telegram-bot-api). También hace uso del nodo [Express](https://expressjs.com/es/) para que tenga la funcionalidad de un server y pueda devolver un JSON si accedemos a la ruta raíz de la aplicación mediante un explorador.

Su uso es muy simple, se le añade al bot funciones lambda que cuando se satisfacen se disparan. Por ejemplo la funcion `bot.onText(/\/start/, (msg) => {...});` se disparará cuando al bot le llegue un mensaje igual a "/start".

Para interactuar con el bot es necesario buscarlo en los contactos de Telegram como @cc_issue_bot y comenzar a usarlo escribiendo `/start`. El bot te indicará como debes usarlo.

