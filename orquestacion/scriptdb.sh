#!/bin/bash
# Script para la provisión de la máquina virtual de la base de datos

#Variables para la version de mongo
codename=xenial
mongodb=3.6

# Instalamos git
echo "Instalando git..."
sudo apt-get install git -y

# Clonamos el repositorio
echo "Clonando repositorio..."
sudo git clone https://github.com/adritake/CC_UGR_Personal.git


echo "Añadiendo repositorio de mongodb..."
wget -qO- https://www.mongodb.org/static/pgp/server-${mongodb}.asc | sudo apt-key add
sudo bash -c "echo deb http://repo.mongodb.org/apt/ubuntu ${codename}/mongodb-org/$mongodb multiverse > /etc/apt/sources.list.d/mongodb-org.list"

echo "Actualizando paquetes..."
sudo apt-get update -y

echo "Instalando mongodb..."
sudo apt-get install -y mongodb-org

# Es necesario activar ufw para poder abrir puertos posteriormente. --force para que no sea interactivo
echo "Activando cortafuegos..."
sudo ufw --force enable

# Mongodb escucha en el puerto 27017 por defecto
echo "Abriendo puerto 27017..."
sudo ufw allow 27017

# Como hemos activado el cortafuegos es necesario permitir el puerto 80
echo "Abriendo puerto 80..."
sudo ufw allow 80

# Copiamos el archivo customizado de configuración de mongo
echo "Moviendo archivo de configuración de mongo..."
sudo mv CC_UGR_Personal/orquestacion/mongod.conf /etc/

# Reiniciamos mongo para que surja efecto la configuración nueva
echo "Reiniciando mongodb..."
sudo service mongod restart
