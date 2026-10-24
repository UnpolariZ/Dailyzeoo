@echo off
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Installez Node.js 20 ou superieur puis relancez ce fichier.
  pause
  exit /b 1
)
echo Ouvrez http://localhost:3000 dans votre navigateur.
node server.js
pause
