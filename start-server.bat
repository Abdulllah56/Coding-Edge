@echo off
echo Starting Coding Edge Server...
echo.
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting the server on http://localhost:3000
echo.
echo IMPORTANT: Keep this window open while testing the contact form
echo Press Ctrl+C to stop the server
echo.
call npm start
pause