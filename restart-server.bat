@echo off
echo Killing all Node.js processes...
taskkill /F /IM node.exe >nul 2>&1
echo Starting server on port 5001...
cd server
set PORT=5001
node index.js 