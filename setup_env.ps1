# PowerShell script to set up Python virtual environment 'localaia'
Write-Host "Setting up Python virtual environment 'localaia'..." -ForegroundColor Green

# Check if Python is installed
try {
    $pythonVersion = python --version 2>$null
    Write-Host "Found Python: $pythonVersion" -ForegroundColor Blue
} catch {
    Write-Host "Error: Python is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Python from https://python.org" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

# Create virtual environment
Write-Host "Creating virtual environment..." -ForegroundColor Blue
try {
    python -m venv localaia
    Write-Host "Virtual environment created successfully!" -ForegroundColor Green
} catch {
    Write-Host "Error: Failed to create virtual environment" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

# Activate virtual environment and install requirements
Write-Host "Activating virtual environment and installing requirements..." -ForegroundColor Blue
try {
    & ".\localaia\Scripts\Activate.ps1"
    python -m pip install --upgrade pip
    
    if (Test-Path "requirements.txt") {
        pip install -r requirements.txt
        Write-Host "Requirements installed successfully!" -ForegroundColor Green
    } else {
        Write-Host "No requirements.txt found - environment created but no packages installed" -ForegroundColor Yellow
    }
} catch {
    Write-Host "Warning: Some packages may have failed to install" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Virtual environment 'localaia' created successfully!" -ForegroundColor Green
Write-Host "To activate it in the future, run: .\localaia\Scripts\Activate.ps1" -ForegroundColor Cyan
Write-Host "To deactivate, run: deactivate" -ForegroundColor Cyan
Read-Host "Press Enter to continue"