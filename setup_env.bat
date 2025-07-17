@echo off
echo Setting up Python virtual environment 'localaia'...

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo Error: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Create virtual environment
echo Creating virtual environment...
python -m venv localaia
if errorlevel 1 (
    echo Error: Failed to create virtual environment
    pause
    exit /b 1
)

REM Activate virtual environment and install requirements
echo Activating virtual environment and installing requirements...
call localaia\Scripts\activate.bat
python -m pip install --upgrade pip
if exist requirements.txt (
    pip install -r requirements.txt
    if errorlevel 1 (
        echo Warning: Some packages failed to install
    ) else (
        echo Requirements installed successfully!
    )
) else (
    echo No requirements.txt found - environment created but no packages installed
)

echo.
echo Virtual environment 'localaia' created successfully!
echo To activate it in the future, run: localaia\Scripts\activate.bat
echo To deactivate, run: deactivate
pause