@echo off
setlocal

cd /d "%~dp0"

echo Iniciando servidor local de ExamenIbero...
start "ExamenIbero Server" cmd /k "cd /d ""%~dp0"" && npm run serve"

timeout /t 3 /nobreak >nul

echo Abriendo la aplicacion en el navegador...
start "" "http://127.0.0.1:4173"

exit /b 0
