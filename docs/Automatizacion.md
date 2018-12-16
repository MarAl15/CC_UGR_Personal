# Automatización de la creación de máquinas virtuales desde línea de órdenes
## Elección de la región del centro de datos

Para elegir qué región vamos a usar para crear nuestra MV se pretende medir la latencia a distintos centros de datos y quedarnos con la mejor. Una opción sería crear MV's idénticas en distintas regiones y medir su latencia con alguna herramienta como por ejemplo el comando `ping` de Ubuntu como se explica en esta [página web](http://somebooks.es/uso-del-comando-ping-ubuntu/).

He encontrado esta [página web](https://azurespeedtest.azurewebsites.net/) donde hace un ping a todas las regiones de Azure y va mostrando gráficamente su latencia. El código de esa página web se encuentra en este [repositorio](https://github.com/richorama/AzureSpeedTest2) de GitHub. A continuación se muestra el resultado de esta página web:

![latencia.png](./img/Latencia.png)

Como se puede observar, la región con mejor latencia es Francia Central por lo que será la elegida para albergar nuestro servicio.
