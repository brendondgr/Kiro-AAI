"""
Unit tests for the refresh button functionality and console UI.
"""
import unittest
from unittest.mock import patch, MagicMock
from app import app, socketio, handle_refresh_event, console_clear
from console import Console

class TestRefreshButtons(unittest.TestCase):
    """Test cases for the refresh button functionality."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.app = app.test_client()
        self.app_context = app.app_context()
        self.app_context.push()
        
        # Create a mock for the socketio.emit function
        self.socketio_emit_patcher = patch('app.socketio.emit')
        self.mock_socketio_emit = self.socketio_emit_patcher.start()
        
        # Create a mock for the console.printl function
        self.console_printl_patcher = patch('app.console.printl')
        self.mock_console_printl = self.console_printl_patcher.start()
        self.mock_console_printl.return_value = "> [12:34:56] Test message"
    
    def tearDown(self):
        """Tear down test fixtures."""
        self.socketio_emit_patcher.stop()
        self.console_printl_patcher.stop()
        self.app_context.pop()
    
    def test_stt_refresh_button(self):
        """Test that the STT refresh button displays the correct console message."""
        # Call the handle_refresh_event function with STT refresh type
        handle_refresh_event({'type': 'stt'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("Speech-To-Text Models have been refreshed")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_tts_refresh_button(self):
        """Test that the TTS refresh button displays the correct console message."""
        # Call the handle_refresh_event function with TTS refresh type
        handle_refresh_event({'type': 'tts'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("Text-To-Speech Models have been refreshed")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_llm_refresh_button(self):
        """Test that the LLM refresh button displays the correct console message."""
        # Call the handle_refresh_event function with LLM refresh type
        handle_refresh_event({'type': 'llm'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("LLM Models have been refreshed")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_input_device_refresh_button(self):
        """Test that the input device refresh button displays the correct console message."""
        # Call the handle_refresh_event function with input-device refresh type
        handle_refresh_event({'type': 'input-device'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("Input Audio Devices have been refreshed")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_output_device_refresh_button(self):
        """Test that the output device refresh button displays the correct console message."""
        # Call the handle_refresh_event function with output-device refresh type
        handle_refresh_event({'type': 'output-device'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("Output Audio Devices have been refreshed")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_unknown_refresh_button(self):
        """Test that an unknown refresh button type displays a generic console message."""
        # Call the handle_refresh_event function with an unknown refresh type
        handle_refresh_event({'type': 'unknown'})
        
        # Check that console.printl was called with the correct message
        self.mock_console_printl.assert_called_once_with("Unknown component has been refreshed: unknown")
        
        # Check that socketio.emit was called with the correct parameters
        self.mock_socketio_emit.assert_called_once_with('console_message', {'message': "> [12:34:56] Test message"})
    
    def test_console_clear(self):
        """Test that the console clear functionality works correctly."""
        # Create a mock for the console.clear function
        with patch('app.console.clear') as mock_console_clear:
            # Call the console_clear function
            with self.app.test_client() as client:
                response = client.post('/api/console/clear')
                
                # Check that the response is successful
                self.assertEqual(response.status_code, 200)
                self.assertEqual(response.json, {"status": "success"})
                
                # Check that console.clear was called
                mock_console_clear.assert_called_once()
                
                # Check that socketio.emit was called with the correct parameters
                self.mock_socketio_emit.assert_any_call('console_clear')

if __name__ == "__main__":
    unittest.main()