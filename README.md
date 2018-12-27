# PROYECTO PARA CLOUD COMPUTING
## Descripción del problema y solución propuesta

En el desarrollo de muchos proyectos de software la comunicación entre miembros del equipo se suele hacer mediante aplicaciones de dispositivos móviles. Las más usadas son WhatsApp y Telegram.

Usualmente la gestión de tareas a realizar en un proyecto se suele llevar a cabo con herramientas externas como por ejemplo [Trello](https://trello.com/). Se propone así, crear un servicio con el que se puedan gestionar las tareas a realizar de igual manera que en la asignatura hacemos uso de "issues" y "milestones". El servicio incluirá la siguiente funcionalidad:

- Creación de nuevos issues.
- Edición de issues existentes.
- Asignación de issues a personas.
- Creación de milestones.
- Asignación de issues a milestones.
- Obtención de issues en base a criterios.
- Asignación de deadlines a issues.
- Notificaciones de deadlines en la conversación.




## Descripción del proyecto

Tras un estudio de las [arquitecturas](http://jj.github.io/CC/documentos/temas/Arquitecturas_para_la_nube) posibles para el desarrollo del proyecto, se ha optado por una arquitectura basada en microservicios ya que se adapta perfectamente a lo que se pretende hacer y es necesario que esté alojada en la nube y a la filosofía de la asignatura Cloud Computing.


El servicio será desarrollado en node.js y será desplegado en un servidor en la nube. Para este desarrollo existe una framework para node.js con el que se puede programar toda la funcionalidad de las peticions REST.

En cuanto al almacenamiento de datos se usará una base de datos [MongoDB](https://www.mongodb.com/es) la cual será desplegada en la nube. En ella se almacenarán las distintas tablas necesarias para la gestión de issues y milestones.

La comunicación entre servicios será realizada por brokers, en especial [RabbitMQ](https://www.rabbitmq.com/).

Por lo tanto el proyecto contará con dos microservicios:

- Un "servicio almacenador" que será la base de datos en MongoDB.
- Un "servicio gestor" que será el encargado de enviar y recibir datos a los usuarios y procesar los comandos que estos le envían. En general los comandos a realizar por este servicio serán almacenar issues o milestones en la base de datos o enviar los ya almacenados a los usuarios.


## Descripción de los milestones del proyecto

Los milestones del proyecto coincidirán mayormente con los de la asignatura. [Enlace a los milestones](https://github.com/adritake/CC_UGR_Personal/milestones).

## Paas seleccionado para el proyecto

El Paas seleccionado para el proyecto es [Heroku](https://www.heroku.com/). Más información sobre esta selección en el siguiente [documento](./docs/PaaS.md)

## Despliegue de la aplicación

Los pasos que he seguido para realizar el servicio se encuentran en el siguiente [documento](./docs/Desarrollo.md)

En este [documento](./docs/Despliegue.md) se explican los pasos a seguir para que puedas desplegar el servicio.

El proyecto se ha desplegado en:

despliegue https://shrouded-peak-63776.herokuapp.com/

## Funcionamiento de la aplicación.

El funcionamiento de la aplicación se explica en este [documento](./docs/Funcionamiento.md).


## Aprovisionamiento

La aplicación se ha desplegado en Azure en una máquina virtual con *Ubuntu Server 18.04*. Se ha usado ansible para su aprovisionamiento. Más información sobre el aprovisionamiento y las instrucciones para aprovisionar por tu cuenta en este [documento](docs/Provision.md).

El aprovisionamiento de este proyecto ha sido comprobado por Mar Alguacil Caballero ([@MarAl15](https://github.com/MarAl15)) en el siguiente [documento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/provision-adritake.md).

He comprobado el aprovisionamiento de Mar Alguacil Caballero ([@MarAl15](https://github.com/MarAl15)) en el siguiente [documento](./docs/Provision.md).

MV: 168.61.179.44

## Automatización

Se ha creado un [script](./acopio.sh) de bash donde se crear una MV en Azure con imagen Ubuntu Server 18.04 LTS. Además se prepara la imagen para poder acceder a ella vía http y se aprovisiona con un [playbook](./provision/MyPlaybook.yml) de Ansible. Documentación detallada sobre la automatización se encuentra en el siguiente [documento](./docs/Automatizacion.md)

MV2: 40.89.158.239


[Página web del proyecto](https://adritake.github.io/CC_UGR_Personal/).
