// Initialize Socket.IO
const socket = io();

// --- Console Logic ---
const consoleOutput = document.getElementById('console-output');

// Handle incoming console messages
socket.on('console_message', function(data) {
    addConsoleMessage(data.message);
});

// Handle console clear command
socket.on('console_clear', function() {
    clearConsole();
});

function addConsoleMessage(message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = message;
    messageElement.className = 'console-row';
    consoleOutput.appendChild(messageElement);
    
    // Auto-scroll to bottom
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
    consoleOutput.innerHTML = '';
}

// --- Resizing Logic ---
const mainContainer = document.getElementById('main-container');
const resizerX = document.getElementById('resizer-x');
const leftPanel = document.getElementById('transcription-panel');
const resizerY1 = document.getElementById('resizer-y1');
const resizerY2 = document.getElementById('resizer-y2');
const settingsPanel = document.getElementById('settings-panel');
const middleContainer = document.getElementById('resizable-container');
const consolePanel = document.getElementById('console-panel');

let isResizingX = false, isResizingY1 = false, isResizingY2 = false;

resizerX.addEventListener('mousedown', (e) => { e.preventDefault(); isResizingX = true; document.body.classList.add('no-select'); window.addEventListener('mousemove', handleMouseMoveX); window.addEventListener('mouseup', handleMouseUpX); });
resizerY1.addEventListener('mousedown', (e) => { e.preventDefault(); isResizingY1 = true; document.body.classList.add('no-select'); window.addEventListener('mousemove', handleMouseMoveY1); window.addEventListener('mouseup', handleMouseUpY1); });
resizerY2.addEventListener('mousedown', (e) => { e.preventDefault(); isResizingY2 = true; document.body.classList.add('no-select'); window.addEventListener('mousemove', handleMouseMoveY2); window.addEventListener('mouseup', handleMouseUpY2); });

const handleMouseMoveX = (e) => { if (!isResizingX) return; const rect = middleContainer.getBoundingClientRect(); let w = e.clientX - rect.left; const minW = 150; if (w < minW) w = minW; if (rect.width - w < minW) w = rect.width - minW; leftPanel.style.flexBasis = `${(w / rect.width) * 100}%`; };
const handleMouseMoveY1 = (e) => { if (!isResizingY1) return; const rect = mainContainer.getBoundingClientRect(); let h = e.clientY - rect.top; const minH = 120; if (h < minH) h = minH; settingsPanel.style.flexBasis = `${h}px`; };
const handleMouseMoveY2 = (e) => { if (!isResizingY2) return; const rect = mainContainer.getBoundingClientRect(); let h = rect.bottom - e.clientY; const minH = 75; if (h < minH) h = minH; consolePanel.style.flexBasis = `${h}px`; };

const handleMouseUpX = () => { isResizingX = false; document.body.classList.remove('no-select'); window.removeEventListener('mousemove', handleMouseMoveX); window.removeEventListener('mouseup', handleMouseUpX); };
const handleMouseUpY1 = () => { isResizingY1 = false; document.body.classList.remove('no-select'); window.removeEventListener('mousemove', handleMouseMoveY1); window.removeEventListener('mouseup', handleMouseUpY1); };
const handleMouseUpY2 = () => { isResizingY2 = false; document.body.classList.remove('no-select'); window.removeEventListener('mousemove', handleMouseMoveY2); window.removeEventListener('mouseup', handleMouseUpY2); };

// --- Settings Logic ---
const modelToggles = document.querySelectorAll('.model-toggle');
modelToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const target = toggle.dataset.target; // "stt", "tts", or "llm"
        const type = toggle.dataset.type; // "local" or "api"

        const parent = toggle.parentElement;
        parent.querySelectorAll('.model-toggle').forEach(btn => {
            btn.classList.remove('bg-white', 'shadow');
            btn.classList.add('text-gray-500');
        });
        toggle.classList.add('bg-white', 'shadow');
        toggle.classList.remove('text-gray-500');

        const localOptions = document.getElementById(`${target}-local-options`);
        const apiOptions = document.getElementById(`${target}-api-options`);

        if (type === 'local') {
            localOptions.classList.remove('hidden');
            apiOptions.classList.add('hidden');
        } else {
            localOptions.classList.add('hidden');
            apiOptions.classList.remove('hidden');
        }
    });
});

// --- Refresh Button Logic ---
const refreshButtons = document.querySelectorAll('.refresh-btn');
refreshButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent dropdown from closing
        const svg = button.querySelector('svg');
        svg.classList.add('spinning');
        setTimeout(() => {
            svg.classList.remove('spinning');
        }, 1000);
    });
});

// --- Audio Settings Dropdown Logic ---
const audioBtn = document.getElementById('audio-settings-btn');
const audioMenu = document.getElementById('audio-settings-menu');
const arrowDown = document.getElementById('arrow-down');
const arrowUp = document.getElementById('arrow-up');

audioBtn.addEventListener('click', () => {
    const isHidden = audioMenu.classList.toggle('hidden');
    arrowDown.classList.toggle('hidden', !isHidden);
    arrowUp.classList.toggle('hidden', isHidden);
});

// Close dropdown if clicking outside
window.addEventListener('click', (e) => {
    if (!audioBtn.contains(e.target) && !audioMenu.contains(e.target)) {
        audioMenu.classList.add('hidden');
        arrowDown.classList.remove('hidden');
        arrowUp.classList.add('hidden');
    }
});