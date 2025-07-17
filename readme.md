# AI Transcription and Response UI

A web-based application that provides real-time speech-to-text transcription and AI-powered responses. The application features configurable STT, TTS, and LLM models with support for both local and API-based services.

## Features

- Real-time audio transcription using configurable STT models (local or API-based)
- AI-powered responses via configurable LLM models (local or API-based) 
- Text-to-speech output using configurable TTS models (local or API-based)
- Audio device management and settings
- Resizable UI panels for optimal workflow
- Console output for system monitoring

## Installation

### Prerequisites

- Python 3.7 or higher
- Modern web browser

### Setup Virtual Environment

Choose the appropriate script for your operating system:

#### Windows (Command Prompt)
```bash
setup_env.bat
```

#### Windows (PowerShell)
```powershell
.\setup_env.ps1
```

#### Linux/macOS/WSL
```bash
./setup_env.sh
```

The setup script will:
1. Check if Python is installed
2. Create a virtual environment named "localaia"
3. Activate the environment
4. Upgrade pip
5. Install packages from requirements.txt

### Activating the Environment

After initial setup, activate the virtual environment:

#### Windows (Command Prompt)
```bash
localaia\Scripts\activate.bat
```

#### Windows (PowerShell)
```powershell
.\localaia\Scripts\Activate.ps1
```

#### Linux/macOS/WSL
```bash
source localaia/bin/activate
```

To deactivate the environment, simply run:
```bash
deactivate
```

## Usage

1. Activate your virtual environment (see above)
2. Open `index.html` in your web browser
3. Configure your STT, TTS, and LLM model settings
4. Select your audio input device
5. Start transcribing and interacting with AI

## Development

This is a static web application with no build process required. You can:

- Serve locally using Python: `python -m http.server 8000`
- Use any static server: `npx serve .`
- Or simply open `index.html` directly in your browser

## Technology Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript
- **Backend**: Python (for local AI models)
- **Architecture**: Single-page application with resizable panels
- **APIs**: MediaDevices API for audio device access

## Project Structure

```
/
├── .kiro/                  # Kiro AI assistant configuration
│   └── steering/          # AI guidance documents
├── localaia/              # Python virtual environment (created by setup)
├── index.html             # Main application file
├── requirements.txt       # Python dependencies
├── setup_env.bat          # Windows batch setup script
├── setup_env.ps1          # Windows PowerShell setup script
├── setup_env.sh           # Linux/macOS setup script
└── .gitignore            # Git ignore patterns
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

[Add your license information here]