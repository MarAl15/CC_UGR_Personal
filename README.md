[![Build Status](https://travis-ci.com/adritake/CC_UGR_Personal.svg?branch=master)](https://travis-ci.com/adritake/CC_UGR_Personal)

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

El proyecto contará con dos microservicios:

- Un "servicio almacenador" que será la base de datos en MongoDB.
- Un "servicio gestor" que será el encargado de enviar y recibir datos a los usuarios y procesar los comandos que estos le envían. En general los comandos a realizar por este servicio serán almacenar issues o milestones en la base de datos o enviar los ya almacenados a los usuarios.

Actualmente el proyecto cuenta con el servicio gestor. Este servicio está desarrollado en nodejs para ser desplegado en una máquina virtual en algún servidor. Para este desarrollo existe un framework para nodejs con el que se puede programar toda la funcionalidad de las peticiones REST. El framework usado es [Express](https://expressjs.com/es/).

Para testear el servicio se usa la librería [supertest](https://github.com/visionmedia/supertest) y se usa la herramienta de integración continua [TravisCI](https://travis-ci.com/).

Actualmente el proyecto cuenta con un programa en nodejs llamado [IssueService](./IssueService.js) que es el encargado de antender todas las peticiones REST y escribir en los logs. Por otro lado hay una clase llamada [IssueManager](./IssueManager.js) que es la que realiza toda la funcionalidad de almacenar los datos en un Map. En versiones futuras esta clase se encargará de enviar los datos al servicio almacenador.

En cuanto al almacenamiento de datos se usa una base de datos [MongoDB](https://www.mongodb.com/es) la cual es desplegada en una máquina virtual. En ella se almacenan las distintas colecciones necesarias para la gestión de issues.

Ambos servicios se encuentran en la misma red privada y realizan su comunicación gracias a las IP's y puertos asignados.

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

Se ha creado un [script](./acopio.sh) de bash donde se crear una MV en Azure con imagen Ubuntu Server 18.04 LTS. Además, se prepara la imagen para poder acceder a ella vía http y se aprovisiona con un [playbook](./provision/MyPlaybook.yml) de Ansible. Documentación detallada sobre la automatización se encuentra en el siguiente [documento](./docs/Automatizacion.md)

MV2: 40.89.152.162

## Orquestación

En esta fase del proyecto se cuentan con dos máquinas virtuales, una para el servicio y otra para la base de datos. Su orquestación se ha realizado mediante [Vagrant](https://www.vagrantup.com/). Se han desplegado en Azure en dos máquinas virtuales con UbuntuServer 18.04 y se han aprovisionado con dos scripts de bash que se encuentran en el directorio de [orquestacion](./orquestacion). Más información sobre el proceso de orquestación en el siguiente [documento](./doc/Orquestacion.md).

Despliegue Vagrant:


[Página web del proyecto](https://adritake.github.io/CC_UGR_Personal/).
