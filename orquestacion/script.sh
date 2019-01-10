#!/bin/bash
# Script para la provisión de la máquina virtual

echo "Instalando nodejs..."
sudo apt-get install nodejs -y

echo "Instalando git..."
sudo apt-get install git -y

echo "Actualizando paquetes..."
sudo apt-get update -y

echo "Instalando npm..."
sudo apt-get install npm -y

echo "Clonando repositorio..."
git clone https://github.com/adritake/CC_UGR_Personal.git

# Nos movemos dentro del repositorio
cd CC_UGR_Personal

echo "Instalando dependencias..."
sudo npm install

echo "Instalando pm2..."
sudo npm install pm2 -g

echo "Comenzando servicio..."
sudo pm2 start IssueService.js -- production
