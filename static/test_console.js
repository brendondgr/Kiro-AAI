/**
 * Simple test suite for console.js
 * 
 * In a real application, you would use a proper testing framework like Jest or Mocha.
 * This is a simplified version for demonstration purposes.
 */

// Mock DOM elements
document.body.innerHTML = `
<div id="console-output"></div>
`;

// Mock socket.io
const mockSocket = {
    on: function(event, callback) {
        this.events = this.events || {};
        this.events[event] = callback;
    },
    trigger: function(event, data) {
        if (this.events && this.events[event]) {
            this.events[event](data);
        }
    }
};

// Mock io function
window.io = function() {
    return mockSocket;
};

// Load the console.js module
const script = document.createElement('script');
script.src = 'console.js';
document.body.appendChild(script);

// Wait for script to load
setTimeout(function() {
    console.log('Running tests...');
    
    // Test addConsoleMessage
    console.log('Testing addConsoleMessage...');
    const consoleOutput = document.getElementById('console-output');
    
    // Clear console for testing
    consoleOutput.innerHTML = '';
    
    // Test adding a message
    addConsoleMessage('Test message');
    console.assert(consoleOutput.children.length === 1, 'Should have 1 message');
    console.assert(consoleOutput.children[0].textContent === 'Test message', 'Message content should match');
    
    // Test adding multiple messages
    addConsoleMessage('Test message 2');
    console.assert(consoleOutput.children.length === 2, 'Should have 2 messages');
    
    // Test clearConsole
    console.log('Testing clearConsole...');
    clearConsole();
    console.assert(consoleOutput.children.length === 0, 'Console should be empty after clear');
    
    // Test socket events
    console.log('Testing socket events...');
    mockSocket.trigger('console_message', { message: 'Socket message' });
    console.assert(consoleOutput.children.length === 1, 'Should have 1 message from socket');
    
    mockSocket.trigger('console_clear');
    console.assert(consoleOutput.children.length === 0, 'Console should be empty after socket clear');
    
    console.log('All tests completed!');
}, 500);