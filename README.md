# reto4_grupo2_cloud

## Instalación Duck DNS en AWS

1. Crear la carpeta DuckDNS
Primero, creamos la carpeta `duckdns`:

![](duckdns_capturas/creacion_carpeta_duck_dns.PNG)

2. Crear el script `duck.sh`
Usando `nano`, creamos un archivo llamado `duck.sh`:

![](duckdns_capturas/creacion_duck_sh.PNG)

Insertamos el siguiente texto en el archivo:

![](duckdns_capturas/script.PNG)

3. Cambiar permisos del script
Cambiamos los permisos del archivo `duck.sh` para que sea ejecutable:

![](duckdns_capturas/permisos_script.PNG)

4. Crear la tarea programada
Creamos la tarea programada y seleccionamos la opción 1 (para usar `nano`):

![](duckdns_capturas/tarea_programada_estructura.PNG)

5. Asegurarnos de que el servicio cron esté activo
Verificamos que el servicio `cron` esté habilitado y en ejecución:

```bash
sudo systemctl enable cron
sudo systemctl start cron

# Para revisar el estado del servicio
sudo systemctl status cron
```
6. Finalmente revisamos si esta asignado

![](duckdns_capturas/demo_duck_dns.PNG)

