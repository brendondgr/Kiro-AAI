"""
Unit tests for the console module.
"""
import unittest
from console import Console

class TestConsole(unittest.TestCase):
    """Test cases for the Console class."""
    
    def setUp(self):
        """Set up test fixtures."""
        self.console = Console()
    
    def test_printl(self):
        """Test the printl method."""
        # Test basic message
        message = "Test message"
        result = self.console.printl(message)
        self.assertIn(message, result)
        self.assertIn("> [", result)
        self.assertIn("] Test message", result)
        self.assertEqual(len(self.console.messages), 1)
        
        # Test None message
        result = self.console.printl(None)
        self.assertIn("> [", result)
        self.assertIn("] ", result)
        self.assertEqual(len(self.console.messages), 2)
        
        # Test non-string message
        result = self.console.printl(123)
        self.assertIn("> [", result)
        self.assertIn("] 123", result)
        self.assertEqual(len(self.console.messages), 3)
        
        # Test long message (truncation)
        long_message = "a" * 2000
        result = self.console.printl(long_message)
        self.assertIn("... (truncated)", result)
        self.assertLess(len(result), 1100)  # Message + timestamp + truncation text
    
    def test_clear(self):
        """Test the clear method."""
        # Add some messages
        self.console.printl("Message 1")
        self.console.printl("Message 2")
        self.assertEqual(len(self.console.messages), 2)
        
        # Clear the console
        self.console.clear()
        
        # Should have one message: "Console Cleared"
        self.assertEqual(len(self.console.messages), 1)
        self.assertIn("Console Cleared", self.console.messages[0])
    
    def test_to_dict(self):
        """Test the to_dict method."""
        self.console.printl("Test message")
        data = self.console.to_dict()
        self.assertIn("messages", data)
        self.assertEqual(len(data["messages"]), 1)
        self.assertIn("Test message", data["messages"][0])
    
    def test_from_dict(self):
        """Test the from_dict method."""
        data = {"messages": ["Message 1", "Message 2"]}
        self.console.from_dict(data)
        self.assertEqual(len(self.console.messages), 2)
        self.assertEqual(self.console.messages[0], "Message 1")
        self.assertEqual(self.console.messages[1], "Message 2")

if __name__ == "__main__":
    unittest.main()