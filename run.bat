@echo off
SET PYTHON_PATH="C:\Users\LSA\medlingua-copilot\venv\Scripts\python.exe"
SET PIP_PATH="C:\Users\LSA\medlingua-copilot\venv\Scripts\pip.exe"

REM Check Python installation
IF NOT EXIST %PYTHON_PATH% (
    echo Python not found at %PYTHON_PATH%
    echo Please install Python or update PYTHON_PATH in this script
    pause
    exit /b 1
)

REM Check pip installation
IF NOT EXIST %PIP_PATH% (
    echo Pip not found at %PIP_PATH%
    echo Please install pip or update PIP_PATH in this script
    pause
    exit /b 1
)

cd "C:\Users\LSA\Desktop\Mi landing\Mi-landing"

REM Create virtual environment if it doesn't exist
IF NOT EXIST venv (
    echo Creating virtual environment...
    %PYTHON_PATH% -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat || (
    echo Failed to activate virtual environment
    pause
    exit /b 1
)

REM Install required packages
echo Installing required packages...
%PIP_PATH% install --upgrade pip
%PIP_PATH% install flask python-dotenv flask-cors google-generativeai || (
    echo Failed to install required packages
    pause
    exit /b 1
)

REM Set Flask environment variables
set FLASK_APP=app.py
set FLASK_ENV=development
set FLASK_DEBUG=1

REM Run Flask application
echo Starting Flask application...
%PYTHON_PATH% -m flask run

pause