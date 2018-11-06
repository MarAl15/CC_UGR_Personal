# PROYECTO PARA CLOUD COMPUTING

## Descripción del problema y solución propuesta

En el desarrollo de muchos proyectos de software la comunicación entre miembros del equipo se suele hacer mediante aplicaciones de dispositivos móviles. Las más usadas son WhatsApp y Telegram siendo esta última la que cuenta con más funcionalidades incluyendo el uso de "bots".

Usualmente la gestión de tareas a realizar en un proyecto se suele llevar a cabo con herramientas externas como por ejemplo [Trello](https://trello.com/). Se propone así, realizar un bot de Telegram con el que se puedan gestionar las tareas a realizar de igual manera que en la asignatura hacemos uso de "issues" y "milestones". El bot incluirá la siguiente funcionalidad:

- Creación de nuevos issues.
- Edición de issues existentes.
- Asignación de issues a personas.
- Creación de milestones.
- Asignación de issues a milestones.
- Obtención de issues en base a criterios.
- Asignación de deadlines a issues.
- Notificaciones de deadlines en la conversación.



## Descripción del proyecto

Tras un estudio de las [arquitecturas](http://jj.github.io/CC/documentos/temas/Arquitecturas_para_la_nube) posibles para el desarrollo del proyecto, se ha optado por una arquitectura basada en microservicios ya que se adapta perfectamente al concepto de "bot de Telegram" y a la filosofía de la asignatura Cloud Computing.


El bot será desarrollado en node.js y será desplegado en un servidor en la nube. Para este desarrollo existe una API para node.js con la que se puede programar toda la funcionalidad del bot. Por otro lado, para crear el bot será necesario usar el método que provee la propia aplicacion de Telegram al que llama [BotFather](https://core.telegram.org/bots#6-botfather).

En cuanto al almacenamiento de datos se usará una base de datos [MongoDB](https://www.mongodb.com/es) la cual será desplegada en la nube. En ella se almacenarán las distintas tablas necesarias para la gestión de issues y milestones.

La comunicación entre servicios será realizada por brokers, en especial [RabbitMQ](https://www.rabbitmq.com/).

Por lo tanto el proyecto contará con dos microservicios:

- Un "servicio almacenador" que será la base de datos en MongoDB.
- Un "servicio gestor" que será el bot de Telegram y será el encargado de enviar y recibir datos a los usuarios y procesar los comandos que estos le envían. En general los comandos a realizar por este servicio serán almacenar issues o milestones en la base de datos o enviar los ya almacenados a los usuarios.

La interfaz de este proyecto será la propia aplicación de Telegram la cual se usará para enviar comandos al bot.

## Descripción de los milestones del proyecto

Los milestones del proyecto coincidirán mayormente con los de la asignatura. [Enlace a los milestones](https://github.com/adritake/CC_UGR_Personal/milestones).

## Paas seleccionado para el proyecto

El Paas seleccionado para el proyecto es [Heroku](https://www.heroku.com/). Más información sobre esta selección en el siguiente [documento](./docs/PaaS.md)

## Despliegue de la aplicación

Para crear y desplegar la aplicación se ha usado este [tutorial externo](https://hackernoon.com/host-a-python-telegram-bot-using-azure-in-30-minutes-58f246cedf23) en el que se explican los pasos iniciales. Los pasos que he seguido para realizar el servicio se encuentran en el siguiente [documento](./docs/Desarrollo.md)

En este [documento](./docs/Despliegue.md) se explican los pasos a seguir para que puedas desplegar el bot.

El proyecto se ha desplegado en:

despliegue https://shrouded-peak-63776.herokuapp.com/

## Funcionamiento de la aplicación.

El funcionamiento de la aplicación se explica en este [documento](./docs/Funcionamiento.md).




[Página web del proyecto](https://adritake.github.io/CC_UGR_Personal/).

