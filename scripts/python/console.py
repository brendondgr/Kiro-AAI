"""
Console module for the AI Transcription and Response UI.
This module provides functionality for managing the console output in the UI.
"""
import datetime
import json
from typing import Dict, Any

class Console:
    """
    Console class for managing console output in the UI.
    Provides methods for adding messages and clearing the console.
    """
    
    def __init__(self):
        """Initialize the Console object."""
        self.messages = []
    
    def printl(self, message: str) -> str:
        """
        Add a new message to the console with timestamp.
        
        Args:
            message: The message to add to the console
            
        Returns:
            The formatted message with timestamp
        """
        # Sanitize input
        if message is None:
            message = ""
        
        # Convert to string if not already
        if not isinstance(message, str):
            try:
                message = str(message)
            except Exception:
                message = "Error: Could not convert message to string"
        
        # Truncate if too long (prevent DoS)
        max_length = 1000
        if len(message) > max_length:
            message = message[:max_length] + "... (truncated)"
        
        # Format the message with timestamp
        timestamp = datetime.datetime.now().strftime("%H:%M:%S")
        formatted_message = f"> [{timestamp}] {message}"
        
        # Store the message in the internal list (limit size to prevent memory issues)
        max_messages = 1000
        if len(self.messages) >= max_messages:
            self.messages = self.messages[-max_messages+1:]
        
        self.messages.append(formatted_message)
        
        return formatted_message
    
    def clear(self) -> None:
        """
        Clear all messages from the console and add a 'Console Cleared' message.
        
        Returns:
            None
        """
        # Clear all messages
        self.messages = []
        
        # Add the "Console Cleared" message
        # This will be displayed after the console is cleared
        self.printl("Console Cleared")
    
    def to_dict(self) -> Dict[str, Any]:
        """
        Convert the console state to a dictionary for JSON serialization.
        
        Returns:
            A dictionary representation of the console state
        """
        return {
            "messages": self.messages
        }
    
    def from_dict(self, data: Dict[str, Any]) -> None:
        """
        Update the console state from a dictionary.
        
        Args:
            data: A dictionary containing console state
        """
        if "messages" in data:
            self.messages = data["messages"]