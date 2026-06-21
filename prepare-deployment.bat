@echo off
REM Vercel Deployment Script for Windows
REM This script prepares the project for Vercel deployment

echo 🚀 Starting Vercel Deployment Preparation...
echo ==============================================

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js first.
    exit /b 1
)

REM Check if Python is installed
where python >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Python is not installed. Please install Python first.
    exit /b 1
)

echo ✓ Node.js version:
node --version
echo ✓ Python version:
python --version
echo.

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd frontend
call npm ci
cd ..

REM Check if Python virtual environment exists
if not exist ".venv" (
    echo 📦 Creating Python virtual environment...
    python -m venv .venv
)

echo 📦 Installing backend dependencies...
call .venv\Scripts\activate
pip install -r backend/requirements.txt

REM Run validation
echo.
echo 🔍 Running deployment validation...
python verify_deployment.py

echo.
echo ✅ Deployment preparation complete!
echo.
echo Next steps:
echo 1. Set up environment variables in Vercel dashboard
echo 2. Run: vercel --prod
echo 3. Monitor deployment at: https://vercel.com
echo.
echo For more information, see VERCEL_DEPLOYMENT.md
