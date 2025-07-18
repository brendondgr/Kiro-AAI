# Technical Stack and Development Guidelines

## Technology Stack
- **Backend**: Python 3.7+ with Flask and Flask-SocketIO
- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Communication**: WebSockets via Socket.IO for real-time updates
- **Architecture**: Single-page application with modular components

## Dependencies
- Flask: Web framework for the backend
- Flask-SocketIO: WebSocket support for real-time communication
- Socket.IO (client): JavaScript library for WebSocket communication

## Development Environment
- Python virtual environment named "localaia"
- Modern web browser with WebSocket support

## Common Commands

### Environment Setup
```bash
# Windows Command Prompt
setup_env.bat

# Windows PowerShell
.\setup_env.ps1

# Linux/macOS/WSL
./setup_env.sh
```

### Activating the Environment
```bash
# Windows Command Prompt
localaia\Scripts\activate.bat

# Windows PowerShell
.\localaia\Scripts\Activate.ps1

# Linux/macOS/WSL
source localaia/bin/activate
```

### Running the Application
```bash
# Start the Flask application
python app.py
```

## Code Style Guidelines
- Follow PEP 8 for Python code
- Use docstrings for all functions, classes, and modules
- Maintain consistent 4-space indentation in Python files
- Use camelCase for JavaScript variables and functions
- Organize HTML with proper indentation and component structure
- Prefer Tailwind utility classes for styling

## Testing
- Use Python's unittest framework for backend testing
- Test console functionality with test_console.py
- Frontend JavaScript testing with test_console.js