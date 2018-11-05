# FUNCIONAMIENTO
## Funcionamiento del bot de Telegram

El bot de telegram consiste en un programa en python que hace uso de la [API de bots de Telegram](https://github.com/python-telegram-bot/python-telegram-bot).

Su uso es muy simple, se crean funciones para cada comando y se asignan esas funciones a los comandos, por ejemplo:
`dp.add_handler(CommandHandler("start", start))`. Así, al comando "start" se le asigna la función *start*.

Para interactuar con el bot es necesario buscarlo en los contactos de Telegram como @cc_issue_bot y comenzar a usarlo escribiendo `/start`. El bot te indicará como debes usarlo.

