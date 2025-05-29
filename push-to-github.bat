@echo off
echo 🚀 Premium CMMS Application - GitHub Push Script
echo ================================================

echo.
echo 📋 Instructions:
echo 1. Create a new repository on GitHub.com
echo 2. Copy the repository URL (https://github.com/yourusername/repo-name.git)
echo 3. Replace YOUR_REPO_URL_HERE with your actual repository URL below
echo 4. Run this script

echo.
set /p repo_url="Enter your GitHub repository URL: "

if "%repo_url%"=="" (
    echo ❌ Error: Repository URL is required
    pause
    exit /b 1
)

echo.
echo 🔗 Adding remote origin...
git remote add origin %repo_url%

echo.
echo 📤 Pushing to GitHub...
git branch -M main
git push -u origin main

echo.
echo ✅ Success! Your premium CMMS application has been pushed to GitHub!
echo 🌐 Repository URL: %repo_url%
echo.
echo 📋 What was pushed:
echo   ✨ Premium UI/UX with gradient backgrounds
echo   🎯 Enhanced Disponibility management with drag & drop
echo   📊 Real-time statistics dashboard
echo   🔍 Advanced filtering system
echo   🇫🇷 French localization
echo   📱 Responsive design
echo   🎨 Modern React + Tailwind CSS

pause
