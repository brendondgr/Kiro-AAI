# Technology Stack

## Frontend
- **HTML5** - Single-page application structure
- **Tailwind CSS** - Utility-first CSS framework via CDN
- **Vanilla JavaScript** - No framework dependencies, pure DOM manipulation
- **Web APIs** - MediaDevices API for audio device access

## Styling & UI
- **Tailwind CSS 3.x** - Loaded via CDN (`https://cdn.tailwindcss.com`)
- **Custom CSS** - Minimal custom styles for resizing handles and animations
- **Times New Roman** - Primary font family
- **Responsive Design** - Mobile-first approach with responsive grid layouts

## Architecture Patterns
- **Component-based UI** - Modular panel system (Settings, Transcription, LLM Response, Console)
- **Event-driven** - DOM event listeners for user interactions
- **Resizable Layout** - Custom drag-to-resize functionality for panels
- **Toggle-based Configuration** - Local vs API model selection

## Build System
This is a static web application with no build process required.

### Development Commands
```bash
# Serve locally (any static server)
python -m http.server 8000
# or
npx serve .
# or simply open index.html in browser
```

### Deployment
- Static hosting compatible (GitHub Pages, Netlify, Vercel, etc.)
- No compilation or bundling required
- Single HTML file deployment