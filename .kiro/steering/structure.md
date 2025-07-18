# Project Structure and Organization

## Directory Structure
```
/
├── app.py                 # Main Flask application entry point
├── console.py             # Console functionality module
├── test_console.py        # Tests for console functionality
├── requirements.txt       # Python dependencies
├── setup_env.bat          # Windows batch setup script
├── setup_env.ps1          # Windows PowerShell setup script
├── setup_env.sh           # Linux/macOS setup script
├── readme.md              # Project documentation
│
├── templates/             # HTML templates
│   ├── base.html          # Base template with common structure
│   ├── index.html         # Main application page
│   └── components/        # Reusable UI components
│       └── console.html   # Console component template
│
├── static/                # Static assets
│   ├── styles.css         # Custom CSS styles
│   ├── main.js            # Main JavaScript functionality
│   ├── console.js         # Console-specific JavaScript
│   └── test_console.js    # Tests for console JavaScript
│
└── .kiro/                 # Kiro AI assistant configuration
    └── steering/          # AI guidance documents
```

## Component Architecture
- **Backend Components**:
  - `app.py`: Flask application setup, routes, and WebSocket handlers
  - `console.py`: Console class for message management and formatting

- **Frontend Components**:
  - **Templates**: HTML structure using Jinja2 templating
    - Base template with common elements
    - Component-based structure for reusability
  - **JavaScript Modules**:
    - UI interaction and event handling
    - WebSocket communication
    - Panel resizing functionality
    - Console message management

## Data Flow
1. User interacts with the UI (audio input, settings changes)
2. Frontend JavaScript captures events and sends to backend via API/WebSockets
3. Backend processes requests and updates state
4. Updates are broadcast to connected clients via WebSockets
5. Frontend updates UI based on received events

## Extension Points
- Add new AI model integrations in the settings panels
- Create additional UI components in the templates/components directory
- Extend the Console class for additional logging functionality
- Add new API endpoints in app.py for additional features