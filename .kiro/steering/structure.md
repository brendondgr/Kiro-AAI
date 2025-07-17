# Project Structure

## File Organization
```
/
├── .kiro/                  # Kiro AI assistant configuration
│   └── steering/          # AI guidance documents
├── index.html             # Main application file (single-page app)
└── .gitignore            # Git ignore patterns
```

## Code Organization within index.html

### HTML Structure
- **Navbar** - Audio settings dropdown and branding
- **Settings Panel** - Model configuration (STT, TTS, LLM)
- **Main Content Area** - Split between Transcription and LLM Response
- **Console Panel** - System output and logging

### CSS Structure
- **External Dependencies** - Tailwind CSS via CDN
- **Custom Styles** - Embedded `<style>` block for:
  - Resizer handle styling
  - Animation keyframes
  - Font family overrides
  - Layout-specific adjustments

### JavaScript Structure
- **Resizing Logic** - Panel resize functionality with mouse events
- **Settings Logic** - Model toggle switches (Local/API)
- **UI Interactions** - Dropdown menus, refresh buttons
- **Event Handlers** - Mouse events, click handlers

## Conventions

### CSS Classes
- Use Tailwind utility classes for styling
- Custom classes prefixed with descriptive names (`resizer-x`, `resizer-y`, `no-select`)
- Consistent color scheme: blue for primary, gray for neutral

### JavaScript
- Use `const` for DOM element references
- Event listeners attached via `addEventListener`
- Modular functions for specific interactions
- Clear variable naming with camelCase

### HTML
- Semantic HTML5 elements
- Consistent ID naming with kebab-case
- Accessible form elements with proper labels
- SVG icons embedded inline for performance