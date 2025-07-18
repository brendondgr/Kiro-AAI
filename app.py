"""
Flask application entry point for the AI Transcription and Response UI.
"""
from flask import Flask, render_template, jsonify, request
from flask_socketio import SocketIO
from console import Console

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'
socketio = SocketIO(app)

# Initialize the console
console = Console()

@app.route('/')
def index():
    """Render the main application page."""
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    """Handle client connection to WebSocket."""
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    """Handle client disconnection from WebSocket."""
    print('Client disconnected')

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

# Console API routes
@app.route('/api/console/print', methods=['POST'])
def console_print():
    """API endpoint for adding a message to the console."""
    data = request.json
    if not data or 'message' not in data:
        return jsonify({"status": "error", "message": "No message provided"}), 400
    
    # Get the message from the request
    message = data['message']
    
    # Add the message to the console
    formatted_message = console.printl(message)
    
    # Emit the message to all connected clients
    socketio.emit('console_message', {'message': formatted_message})
    
    return jsonify({
        "status": "success", 
        "message": formatted_message
    })

@app.route('/api/console/clear', methods=['POST'])
def console_clear():
    """API endpoint for clearing the console."""
    try:
        # Clear the console
        console.clear()
        
        # Emit the clear event to all connected clients
        socketio.emit('console_clear')
        
        # Emit the "Console Cleared" message
        if console.messages:
            socketio.emit('console_message', {'message': console.messages[-1]})
        
        return jsonify({"status": "success"})
    except Exception as e:
        # Log the error
        print(f"Error clearing console: {str(e)}")
        return jsonify({"status": "error", "message": "Failed to clear console"}), 500

if __name__ == '__main__':
    socketio.run(app, debug=True)