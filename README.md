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

Tras un estudio de las [arquitecturas] (http://jj.github.io/CC/documentos/temas/Arquitecturas_para_la_nube) posibles para el desarrollo del proyecto, se ha optado por una arquitectura basada en microservicios ya que se adapta perfectamente al concepto de "bot de Telegram" y a la filosofía de la asignatura Cloud Computing.


El bot será desarrollado en python y será desplegado en un servidor en la nube. Para este desarrollo existe una API para python con la que se puede programar toda la funcionalidad del bot. Por otro lado, para crear el bot será necesario usar el método que provee la propia aplicacion de Telegram al que llama [BotFather](https://core.telegram.org/bots#6-botfather).

En cuanto al almacenamiento de datos se usará una base de datos mySQL la cual será desplegada en la nube. En ella se almacenarán las distintas tablas necesarias para la gestión de issues y milestones.

## Descripción de los milestones del proyecto

Los milestones del proyecto coincidirán mayormente con los de la asignatura. [Enlace a los milestones](https://github.com/adritake/CC_UGR_Personal/milestones).



[Página web del proyecto](https://adritake.github.io/CC_UGR_Personal/)

[Repositorio de los ejercicios teóricos](https://github.com/adritake/EjerciciosCC.git)
