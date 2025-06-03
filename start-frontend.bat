@echo off
echo.
echo ========================================
echo   CMMS Frontend Startup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed or not in PATH
    echo Please install Node.js 16+ from https://nodejs.org/
    pause
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ npm is not installed or not in PATH
    pause
    exit /b 1
)

echo ✅ Node.js and npm are installed

REM Check if node_modules exists
if not exist "node_modules" (
    echo.
    echo 📦 Installing dependencies...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ Failed to install dependencies
        pause
        exit /b 1
    )
    echo ✅ Dependencies installed successfully
)

echo.
echo 🚀 Starting CMMS Frontend...
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend should be running at: http://localhost:5000
echo.
echo Press Ctrl+C to stop the server
echo.

REM Start the React development server
npm start

pause
