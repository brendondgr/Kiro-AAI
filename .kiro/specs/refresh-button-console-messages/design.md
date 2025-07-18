# Design Document: Refresh Button Console Messages

## Overview

This design document outlines the approach for implementing console messages when refresh buttons are clicked in the AI Transcription and Response UI. The implementation will leverage the existing console functionality and WebSocket communication pattern to display informative messages when users click refresh buttons in the Speech-to-Text, Text-to-Speech, LLM cards, and audio device settings.

## Architecture

The implementation will follow the existing application architecture:

1. **Frontend Components**:
   - JavaScript event handlers for refresh button clicks
   - WebSocket communication to send refresh events to the backend

2. **Backend Components**:
   - Flask routes to handle refresh events
   - Console class for message formatting and management
   - WebSocket communication to broadcast console messages to clients

## Components and Interfaces

### Frontend Components

#### JavaScript Event Handlers

We will enhance the existing refresh button event handlers in `main.js` to:
1. Send a WebSocket event to the server when a refresh button is clicked
2. Include information about which refresh button was clicked (STT, TTS, LLM, input device, output device)

```javascript
// Example of enhanced refresh button event handler
refreshButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent dropdown from closing
        const svg = button.querySelector('svg');
        svg.classList.add('spinning');
        
        // Get the type of refresh button from data attribute
        const refreshType = button.dataset.refreshType;
        
        // Send refresh event to server
        socket.emit('refresh_event', { type: refreshType });
        
        setTimeout(() => {
            svg.classList.remove('spinning');
        }, 1000);
    });
});
```

### Backend Components

#### WebSocket Event Handler

We will add a new WebSocket event handler in `app.py` to:
1. Receive refresh events from the client
2. Determine the appropriate message based on the refresh type
3. Use the Console class to add the message to the console
4. Broadcast the message to all connected clients

```python
@socketio.on('refresh_event')
def handle_refresh_event(data):
    """Handle refresh button events from the client."""
    refresh_type = data.get('type', '')
    
    # Determine message based on refresh type
    if refresh_type == 'stt':
        message = "Speech-To-Text Models have been refreshed"
    elif refresh_type == 'tts':
        message = "Text-To-Speech Models have been refreshed"
    elif refresh_type == 'llm':
        message = "LLM Models have been refreshed"
    elif refresh_type == 'input-device':
        message = "Input Audio Devices have been refreshed"
    elif refresh_type == 'output-device':
        message = "Output Audio Devices have been refreshed"
    else:
        message = f"Unknown component has been refreshed: {refresh_type}"
    
    # Add message to console
    formatted_message = console.printl(message)
    
    # Broadcast message to all clients
    socketio.emit('console_message', {'message': formatted_message})
```

## Data Models

No new data models are required for this feature. We will use the existing Console class and its methods.

## Error Handling

1. **Invalid Refresh Type**: If an unknown refresh type is received, a generic message will be displayed in the console.
2. **WebSocket Connection Issues**: The existing error handling for WebSocket connections will be maintained.

## Testing Strategy

### Unit Tests

1. **Frontend Tests**:
   - Test that refresh button clicks emit the correct WebSocket events with the correct refresh type
   - Test that console messages are properly displayed when received from the server

2. **Backend Tests**:
   - Test that the WebSocket event handler correctly processes different refresh types
   - Test that the Console class correctly formats and stores messages

### Integration Tests

1. Test the end-to-end flow from button click to console message display
2. Verify that all refresh buttons trigger the appropriate console messages
3. Verify that console messages are properly formatted and displayed to all connected clients