#!/bin/bash

#Variable del Script
REGION="FranceCentral"
IMAGENSTR="Ubuntu Server 18.04 LTS"
GRUPO="GrupoIssue"
NOMBREMV="MVIssue"
IMAGEN="Canonical:UbuntuServer:18.04-LTS:latest"

echo "Comienzo de la creación de la máquina virtual en Azure..."
echo "Se va a crear una máquina virtual con imagen $IMAGENSTR en la region $REGION"

#Creamos el grupo de recursos
echo "Creando el grupo de recursos"
az group create -l $REGION -n $GRUPO


echo "Creando máquina virtual"
#Creamos una MV con el grupo de recursos "GrupoIssue", se llama "MVIssue", la imagen usada es Ubuntu Server 18.04 LTS
# y se van a generar claves ssh. La salida se hará en formato JSON. Además se indica que la ip sea estática para que
# no cambie con el tiempo.
az vm create --resource-group $GRUPO --name $NOMBREMV --image $IMAGEN --generate-ssh-keys --output json --verbose --public-ip-address-allocation static --size Standard_A0

echo "Abriendo el puerto 80"
#Para conectarse via http a la MV es necesario abri el puerto 80
az vm open-port --resource-group $GRUPO --name $NOMBREMV --port 80


echo "Máquina virtual creada correctamente"
