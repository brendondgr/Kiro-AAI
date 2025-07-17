# Design Document

## Overview

This design outlines the refactoring of the monolithic `index.html` file into a well-organized multi-file structure. The current single-file application contains HTML structure, embedded CSS styles, and JavaScript functionality all within one file. The refactoring will separate these concerns into distinct files while maintaining identical functionality and user experience.

The separation will follow standard web development practices by extracting CSS and JavaScript into dedicated files within a "scripts" folder, creating a cleaner, more maintainable codebase structure.

## Architecture

### Current Structure
```
/
├── index.html (monolithic - contains HTML, CSS, and JavaScript)
└── other files...
```

### Target Structure
```
/
├── index.html (HTML structure + external references)
├── scripts/
│   ├── styles.css (extracted CSS)
│   └── main.js (extracted JavaScript)
└── other files...
```

### File Organization Strategy

1. **HTML File (index.html)**: Contains only the document structure, meta tags, external dependencies (Tailwind CSS CDN), and references to separated CSS and JavaScript files
2. **CSS File (scripts/styles.css)**: Contains all custom styles currently embedded in the `<style>` tag
3. **JavaScript File (scripts/main.js)**: Contains all JavaScript functionality currently embedded in the `<script>` tag

## Components and Interfaces

### HTML Structure (index.html)
- **Document Head**: Meta tags, title, Tailwind CSS CDN link, and reference to custom CSS file
- **Document Body**: Complete HTML structure for all UI components
- **External References**: Links to `scripts/styles.css` and `scripts/main.js`

### CSS Structure (scripts/styles.css)
The CSS file will contain the following sections in order:
1. **Global Styles**: Body font family and overflow settings
2. **Resizer Styles**: Cursor and user-select properties for drag handles
3. **Utility Classes**: No-select class for preventing text selection during resize
4. **Animations**: Keyframes for the refresh button spin animation

### JavaScript Structure (scripts/main.js)
The JavaScript file will contain the following functional modules:
1. **DOM Element References**: Constants for all interactive elements
2. **Resizing Logic**: Mouse event handlers for panel resizing functionality
3. **Settings Logic**: Model toggle functionality for STT/TTS/LLM selection
4. **UI Interactions**: Refresh button animations and dropdown menu behavior

## Data Models

### CSS Organization
```css
/* Global Styles */
body { ... }

/* Resizer Components */
.resizer-x { ... }
.resizer-y { ... }
.no-select { ... }

/* Animations */
@keyframes spin { ... }
.spinning { ... }
```

### JavaScript Module Structure
```javascript
// DOM Element References
const mainContainer = document.getElementById('main-container');
// ... other element references

// Resizing Logic Module
let isResizingX = false, isResizingY1 = false, isResizingY2 = false;
// ... resizing event handlers

// Settings Logic Module
const modelToggles = document.querySelectorAll('.model-toggle');
// ... toggle functionality

// UI Interactions Module
const refreshButtons = document.querySelectorAll('.refresh-btn');
// ... refresh and dropdown logic
```

## Error Handling

### File Loading Validation
- **CSS Loading**: Browser will gracefully handle missing CSS file by using default styles
- **JavaScript Loading**: Browser will show console errors for missing JS file but HTML structure remains intact
- **Path Resolution**: All file paths will be relative to ensure proper loading from any server environment

### Functionality Preservation
- **Event Listeners**: All existing event listeners will be preserved exactly as they are
- **DOM Manipulation**: All DOM queries and manipulations will remain unchanged
- **State Management**: All existing state variables and logic will be maintained

### Browser Compatibility
- **CSS Support**: All existing CSS features will continue to work as they use standard properties
- **JavaScript Support**: All existing JavaScript uses standard DOM APIs with broad browser support
- **External Dependencies**: Tailwind CSS CDN reference will remain unchanged

## Testing Strategy

### Functional Testing
1. **Visual Verification**: Compare rendered application before and after separation to ensure identical appearance
2. **Interactive Testing**: Test all interactive elements (resizers, toggles, dropdowns, refresh buttons) to ensure identical behavior
3. **Responsive Testing**: Verify that all responsive behaviors and panel resizing work as before

### Technical Testing
1. **File Loading**: Verify that all separated files load correctly without 404 errors
2. **CSS Application**: Confirm that all styles are applied correctly from the external CSS file
3. **JavaScript Execution**: Ensure all JavaScript functionality executes without errors

### Cross-Browser Testing
1. **Modern Browsers**: Test in Chrome, Firefox, Safari, and Edge to ensure compatibility
2. **File Path Resolution**: Verify that relative paths work correctly across different browsers
3. **External Dependencies**: Confirm Tailwind CSS continues to load and apply correctly

### Performance Testing
1. **Load Time**: Measure any impact on initial page load time (should be minimal or improved due to caching)
2. **Resource Caching**: Verify that separated CSS and JS files can be cached independently
3. **Network Requests**: Confirm that the total number of network requests is reasonable (HTML + CSS + JS + Tailwind CDN)

## Implementation Considerations

### File Naming Conventions
- **CSS File**: `styles.css` - descriptive and follows standard naming conventions
- **JavaScript File**: `main.js` - indicates primary application logic
- **Folder Structure**: `scripts/` folder to contain both CSS and JavaScript assets

### Code Preservation
- **Exact Extraction**: All CSS and JavaScript code will be extracted exactly as-is without modifications
- **Comment Preservation**: All existing comments in CSS and JavaScript will be maintained
- **Formatting Preservation**: Original code formatting and indentation will be preserved

### Path Management
- **Relative Paths**: All file references will use relative paths from the root directory
- **Cross-Platform Compatibility**: File paths will use forward slashes for cross-platform compatibility
- **Server Independence**: Structure will work with any static file server or when opened directly in browser