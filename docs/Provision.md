# Provisionamiento
## Explicación de herramientas utilizadas

Se va a crear una máquina virtual en el sistema cloud de [Azure](https://azure.microsoft.com/es-es/) ya que en los ejercicios lo hice en un MV local de VirtualBox y ahora prefiero avanzar y desplegarla en una plataforma más profesional. También tengo una suscripción de educación gratuita y además, esta plataforma ofrece un amplio abanico de servicios y máquinas virtuales, entre ellas la que voy a usar. Se ha elegido Ubuntu Server 18.04 porque todo el proyecto se ha desarrollado con este SO y se conoce que funciona perfectamente en él.

# Instrucciones para crear la MV en azure

- El primer paso es acceder al portal de [Azure](https://portal.azure.com/) e iniciar sesión.
- Seleccionar Crear recursos y buscar Ubuntu Server 18.04 VM.
- Para la configuración de la MV se ha seleccionado la subscripción "Hito 3" proporcionada por el profesor de la asignatura. Se ha creado un nuevo grupo de recursos llamado "Hito 3". El nombre de la MV es Hito3MV y la región se ha elegido "Centro de EE.UU.". La imagen es *Ubuntu Server 18.04 LTS*.
- Se ha elegido el tamaño Básico A0 ya que la aplicación requiere unas prestaciones mínimas que son suplidas por ese tamaño. Además es el tamaño más barato.
- Se ha elegido el método de autenticación por clave pública. Para ello se le da un nombre de usuario (en mi caso adritake) y se copia la clave pública de nuestro ordenador en el cuadro del formulario.
- Se ha seleccionado los puertos de entrada 80 (HTTP) y 22 (SSH) para podernos conectar a la MV desde fuera. También hay que abrir el puerto que va a usar la aplicación, en mi caso el puerto 5000.
- En discos se ha seleccionado HDD Estándar.
- En redes se ha dejado los valores que salían por defecto.
- En administración se han dejado los valores por defecto.
- En configuración de invitado no se ha introducido nada.
- En etiquetas tampoco se ha introducido nada.
- Una vez hecho todo se comprueban los datos de la MV en la sección Revisar y crear. Si todo está correcto pulsar crear. La creación de la MV lleva un rato...

## Comprobación de que la MV se ha creado

Para comprobar que se ha creado la MV correctamente me he conectado con ssh a la IP de la MV y este es el resultado:
![SSH Azure](img/SSHAzure1.png)

## Provisionamiento con Ansible

Para provisionar la MV se ha usado Ansible, para ello hay que incluir la IP de la MV en el archivo */etc/ansible/hosts*.

- Abrir con privilegios de súper usuario el archivo */etc/ansible/hosts* e introducir la siguiente línea:
```
[webservers]
MIMV ansible_host=168.61.179.44
```
- Probar que Ansible tiene acceso a la MV ejecutando `ansible all -m ping -u adritake`. En mi caso obtuve el siguiente resultado:
![Ping ansible](img/PingAnsible.png)
- El siguiente paso es crear un PlayBook para provisionar la MV. El playbook que he creado es el [siguiente](../provision/MyPlaybook.yml):
```
---
- hosts: webservers
  user: adritake

  vars:
    - packages: ["nodejs","git","npm"]
    - project_location: /home/adritake/projects

  tasks:
    - name: Install {{ packages }}
      become: yes
      become_user: adritake
      apt:
        name: "{{ packages }}"
        state: present

    - name: Create project location
      file:
        path: "{{ project_location }}"
        state: directory

    - name: Download repository
      git:
        repo: https://github.com/adritake/CC_UGR_Personal.git
        dest: "{{ project_location}}"

    - name: Install dependencies
      npm:
        path: "{{ project_location }}"

    - name: Redirect port 80
      become: yes
      become_user: root
      command:
        iptables -t nat -A PREROUTING -p tcp -m tcp --dport 80 -j REDIRECT --to-ports 5000

    - name: Install pm2
      become: yes
      become_user: root
      command: npm install pm2 -g

    - name: Start service
      command: pm2 start {{ project_location }}/IssueService.js

```

- Lo que hace el playbook es instalar git, nodejs y npm, crea un directorio y descarga este repositorio de GitHub. Instala las dependencias del repositorio con npm. Para redirigir el tráfico del puerto 80 al 5000 que es el que usa la aplicación se ha usado el comando `iptables` tal y como se indica en esta [página](https://clouding.io/kb/redireccionar-el-puerto-587-al-25/). Se instala pm2 para correr el servicio en segundo plano y que no se cierre al terminar la conexión. Por último se lanza el servicio con pm2.

- Al ejecutar `ansible-playbook provision/MyPlaybook.yml` se hacen todas las tareas y se debería obtener un resultado como este:

![Playbook](img/Playbook.png)

- Con esto nuestra aplicación ya estaría funcionando, ahora accediendo desde el explorador a http://168.61.179.44/


## Comprobación de provisión de un compañero

Se va a comprobar la provisión de María del Mar Alguacil Caballero ([@MarAl15](https://github.com/MarAl15)). Para ello voy a crear una máquina virtual como indica en este [documento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/mv-azure.md) y se va a aprovisionar tal y como indica en este otro [documento](https://github.com/MarAl15/ProyectoCC/blob/master/docs/provision.md).

- He creado una máquina virtual en Azure como se ha indicado anteriormente:

![provision mar 1](./img/provision-mar-1.png)
![provision mar 2](./img/provision-mar-2.png)

- He clonado el [repositorio](https://github.com/MarAl15/ProyectoCC) de Mar `git clone https://github.com/MarAl15/ProyectoCC.git`
- En el repositorio, dentro de *provision/ansible_hosts* he tenido que cambiar la ip y el contenido del archivo se ha quedado así:
```
[azure]
ubuntu16 ansible_ssh_port=22 ansible_ssh_host=40.89.153.52

[azure:vars]
ansible_ssh_private_key_file=~/.ssh/id_rsa
ansible_ssh_user=usuario
```
- Se comprueba el estado de la MV haciendole ping con Ansible `ansible ubuntu16 -m ping`:

![provision mar 3](./img/provision-mar-3.png)

- Se ha ejecutado el [playbook](https://github.com/MarAl15/ProyectoCC/blob/master/provision/receta.yml) con `ansible-playbook receta.yml` y se ha obtenido el siguiente resultado:

![provision mar 4](./img/provision-mar-4.png)

- Se comprueba que funciona correctamente accediendo a http://40.89.153.52/ y se obtiene el siguiente mensaje JSON:

![provision mar 5](./img/provision-mar-5.png)
