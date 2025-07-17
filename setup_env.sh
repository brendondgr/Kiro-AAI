#!/bin/bash
# Shell script to set up Python virtual environment 'localaia'

echo "Setting up Python virtual environment 'localaia'..."

# Check if Python is installed
if ! command -v python3 &> /dev/null && ! command -v python &> /dev/null; then
    echo "Error: Python is not installed or not in PATH"
    echo "Please install Python from https://python.org"
    exit 1
fi

# Use python3 if available, otherwise python
PYTHON_CMD="python3"
if ! command -v python3 &> /dev/null; then
    PYTHON_CMD="python"
fi

echo "Found Python: $($PYTHON_CMD --version)"

# Create virtual environment
echo "Creating virtual environment..."
if ! $PYTHON_CMD -m venv localaia; then
    echo "Error: Failed to create virtual environment"
    exit 1
fi

echo "Virtual environment created successfully!"

# Activate virtual environment and install requirements
echo "Activating virtual environment and installing requirements..."
source localaia/bin/activate

# Upgrade pip
python -m pip install --upgrade pip

# Install requirements if file exists
if [ -f "requirements.txt" ]; then
    if pip install -r requirements.txt; then
        echo "Requirements installed successfully!"
    else
        echo "Warning: Some packages failed to install"
    fi
else
    echo "No requirements.txt found - environment created but no packages installed"
fi

echo ""
echo "Virtual environment 'localaia' created successfully!"
echo "To activate it in the future, run: source localaia/bin/activate"
echo "To deactivate, run: deactivate"