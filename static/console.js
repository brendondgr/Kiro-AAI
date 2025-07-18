/**
 * Console functionality for the AI Transcription and Response UI
 */

// Get the console output element
const consoleOutput = document.getElementById('console-output');

// Initialize Socket.IO connection
const socket = io();

/**
 * Add a new message to the console
 * @param {string} message - The message to add
 */
function addConsoleMessage(message) {
    try {
        // Validate input
        if (!message) {
            console.error("Empty message provided to console");
            return;
        }
        
        // Rate limiting - prevent too many messages in short time
        const now = Date.now();
        if (window.lastMessageTime && (now - window.lastMessageTime < 50)) {
            // Queue message for later if too many messages are coming in
            if (!window.messageQueue) window.messageQueue = [];
            window.messageQueue.push(message);
            
            // Process queue after delay if not already scheduled
            if (!window.processingQueue) {
                window.processingQueue = true;
                setTimeout(processMessageQueue, 100);
            }
            return;
        }
        window.lastMessageTime = now;
        
        // Create a new element for the message
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        messageElement.className = 'console-row';
        
        // Add the message to the console
        consoleOutput.appendChild(messageElement);
        
        // Limit number of messages (prevent memory issues)
        const maxMessages = 1000;
        while (consoleOutput.children.length > maxMessages) {
            consoleOutput.removeChild(consoleOutput.firstChild);
        }
        
        // Auto-scroll to the bottom
        consoleOutput.scrollTop = consoleOutput.scrollHeight;
    } catch (error) {
        console.error("Error adding message to console:", error);
    }
}

/**
 * Process queued messages
 */
function processMessageQueue() {
    if (window.messageQueue && window.messageQueue.length > 0) {
        const message = window.messageQueue.shift();
        addConsoleMessage(message);
        
        if (window.messageQueue.length > 0) {
            setTimeout(processMessageQueue, 50);
        } else {
            window.processingQueue = false;
        }
    } else {
        window.processingQueue = false;
    }
}

/**
 * Clear the console
 */
function clearConsole() {
    try {
        // Remove all messages
        consoleOutput.innerHTML = '';
        
        // Reset message queue if it exists
        if (window.messageQueue) {
            window.messageQueue = [];
            window.processingQueue = false;
        }
    } catch (error) {
        console.error("Error clearing console:", error);
    }
}

// Listen for console messages from the server
socket.on('console_message', function(data) {
    addConsoleMessage(data.message);
});

// Listen for console clear events from the server
socket.on('console_clear', function() {
    clearConsole();
});

// Add event listener for the clear button
document.addEventListener('DOMContentLoaded', function() {
    const clearButton = document.getElementById('clear-console-btn');
    if (clearButton) {
        clearButton.addEventListener('click', function() {
            // Send clear request to server
            fetch('/api/console/clear', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Clear the console locally as well to ensure it's cleared
                clearConsole();
            })
            .catch(error => {
                console.error('Error clearing console:', error);
            });
        });
    }
});

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        addConsoleMessage,
        clearConsole
    };
}