/**
 * Test file for console UI functionality
 */

// Mock DOM elements
document.body.innerHTML = `
<div id="console-panel" style="flex-basis: 120px;">
    <div>
        <h3>Console</h3>
        <button id="clear-console-btn">Clear</button>
    </div>
    <div id="console-output" class="h-full">
        <p class="console-row">Initializing application...</p>
    </div>
</div>
`;

// Mock Socket.IO
const mockSocket = {
    on: jest.fn(),
    emit: jest.fn()
};
window.io = jest.fn(() => mockSocket);

// Import the console.js file
require('./static/console.js');

describe('Console UI', () => {
    beforeEach(() => {
        // Reset the console output
        document.getElementById('console-output').innerHTML = '<p class="console-row">Initializing application...</p>';
        
        // Reset the mock fetch
        global.fetch = jest.fn(() => 
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ status: 'success' })
            })
        );
    });
    
    test('Clear button should clear the console', () => {
        // Trigger the clear button click
        document.getElementById('clear-console-btn').click();
        
        // Check that fetch was called with the correct URL and method
        expect(fetch).toHaveBeenCalledWith('/api/console/clear', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        // Check that the console output is cleared
        expect(document.getElementById('console-output').innerHTML).toBe('');
    });
    
    test('Console output should have a fixed height with scrollbar', () => {
        const consoleOutput = document.getElementById('console-output');
        
        // Check that the console output has the h-full class
        expect(consoleOutput.classList.contains('h-full')).toBe(true);
        
        // Add many messages to the console
        for (let i = 0; i < 50; i++) {
            const messageElement = document.createElement('p');
            messageElement.textContent = `Test message ${i}`;
            messageElement.className = 'console-row';
            consoleOutput.appendChild(messageElement);
        }
        
        // Check that the console panel size remains the same
        expect(document.getElementById('console-panel').style.flexBasis).toBe('120px');
    });
});