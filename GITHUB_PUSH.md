# Script para subir el proyecto a GitHub
# Ejecutar después de crear el repositorio en GitHub

# INSTRUCCIONES:
# 1. Crea un repositorio en GitHub llamado "weather-frontend-m3"
# 2. Copia la URL del repositorio (ejemplo: https://github.com/tu-usuario/weather-frontend-m3.git)
# 3. Reemplaza TU_URL_AQUI con la URL real
# 4. Ejecuta estos comandos en PowerShell

cd modulo3_portafolio

# Agregar el remote de GitHub (reemplaza TU_URL_AQUI)
git remote add origin TU_URL_AQUI

# Verificar que el remote se agregó correctamente
git remote -v

# Subir el código a GitHub
git push -u origin main

# ¡Listo! Tu código ahora está en GitHub
