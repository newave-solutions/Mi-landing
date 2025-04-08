@echo off
SET PYTHON_PATH="C:\Users\%USERNAME%\AppData\Local\Programs\Python\Python311\python.exe"

IF NOT EXIST %PYTHON_PATH% (
    echo Python not found at %PYTHON_PATH%
    echo Please install Python or update PYTHON_PATH in this script
    pause
    exit /b 1
)

cd "C:\Users\LSA\Desktop\Mi landing\Mi-landing"
IF NOT EXIST venv (
    %PYTHON_PATH% -m venv venv
)
call venv\Scripts\activate.bat
%PYTHON_PATH% -m pip install flask python-dotenv flask-cors google-generativeai
set FLASK_APP=app.py
set FLASK_ENV=development
set FLASK_DEBUG=1
%PYTHON_PATH% -m flask run
pause