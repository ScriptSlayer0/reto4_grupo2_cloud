# reto4_grupo2_cloud
## Instalación Duck DNS en AWS
Primero hay que crear la carpeta duckdns
![[creacion_carpeta_duck_dns.png]]
Usando nano creamos un archivo llamado `duck.sh`:
![[creacion_duck_sh.png]]
Insertamos este texto:
![[script 1.png]]
Cambiamos los permisos al archivo `duck.sh`:
![[permisos_script.png]]
Creamos la tarea programada y seleccionamos la opción 1 (para usar nano):
![[añadir_tarea_programada.png]]
Nos aseguramos que el servicio cron este `enabled` y `running`:
(Para ello usa los comandos)
```bash
sudo systemctl enable cron
sudo systemctl start cron
#para revisar el estado del servicio
sudo systemctl status cron
```

Ejecutamos el script:
![[ejecutar_script.png]]

Finalmente revisamos si esta asignado:
![[demo_duck_dns.png]]
