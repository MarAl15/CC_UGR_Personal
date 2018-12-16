#!/bin/bash

#Variable del Script
REGION="FranceCentral"
IMAGENSTR="Ubuntu Server 18.04 LTS"
GRUPO="GrupoIssue"
NOMBREMV="MVIssue"
IMAGEN="Canonical:UbuntuServer:18.04-LTS:latest"

echo "Comienzo de la creación de la máquina virtual en Azure..."
echo "Se va a crear una máquina virtual con imagen $IMAGENSTR en la region $REGION"

echo "Por favor, haz login en Azure"
sleep 1s

#Hacer login en Azure
az login

echo "¿Desea crear el grupo de recursos? Escriba [y/n]"

read RESPUESTA

if [[ $RESPUESTA == [Yy] ]]
then
  #Creamos el grupo de recursos
  echo "Creando el grupo de recursos"
  az group create -l $REGION -n $GRUPO
fi

echo "Creando máquina virtual"
#Creamos una MV con el grupo de recursos "GrupoIssue", se llama "MVIssue", la imagen usada es Ubuntu Server 18.04 LTS
# y se van a generar claves ssh. La salida se hará en formato JSON
RESULTADOMV=$(az vm create --resource-group $GRUPO --name $NOMBREMV --image $IMAGEN --generate-ssh-keys --output json --verbose)

echo "Abriendo el puerto 80"
#Para conectarse via http a la MV es necesario abri el puerto 80
az vm open-port --resource-group $GRUPO --name $NOMBREMV --port 80


#Obtenemos la IP de la MV creada
IP=$(echo $RESULTADOMV | jq -r '.publicIpAddress')
echo $IP
#Ejecutamos el script de Ansible para la MV creada
ansible-playbook ./provision/MyPlaybook.yml -i $IP,

echo "Máquina virtual creada y aprovisionada correctamente"
