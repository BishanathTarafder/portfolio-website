import os
import traceback
from typing import List, Dict, Any
from langchain_core.messages import HumanMessage, AIMessage
from google import genai
from google.genai import types
from dotenv import load_dotenv

class LLMManager:
    """
    Manages interactions with the LLM provider.
    Currently supports Google GenAI SDK (v1).
    """
    def __init__(self):
        # Load environment variables to ensure they're available
        load_dotenv()
        print(f"Current working directory when loading env: {os.getcwd()}")
        
        self.provider = os.getenv('LLM_PROVIDER', 'gemini')
        self.model_name = os.getenv('MODEL_NAME', 'gemini-3-flash-preview')
        
        # Set API key for Gemini - try both environment methods
        self.api_key = os.environ.get('GEMINI_API_KEY') or os.getenv('GEMINI_API_KEY')
        
        # Debug Gemini API key
        print(f"DEBUG: Gemini key present: {bool(self.api_key)}")
        print(f"DEBUG: Gemini key length: {len(self.api_key) if self.api_key else 0}")
        
        if not self.api_key:
            print("WARNING: Gemini API key not found. Responses will be limited.")
        else:
            print(f"Gemini API key found: {self.api_key[:5]}...")
            
        self.client = self._initialize_client()
    
    def _initialize_client(self):
        """
        Initialize the Gemini Client.
        """
        try:
            if not self.api_key:
                return None
            return genai.Client(api_key=self.api_key)
        except Exception as e:
            print(f"Error initializing Gemini Client: {type(e).__name__}: {e}")
            traceback.print_exc()
            return None
            
    def test_gemini_auth(self):
        """Test Gemini authentication directly"""
        print("\n=== Testing Gemini Authentication ===")
        if not self.client:
            print("Gemini Client not initialized.")
            return False
            
        try:
            # Test with simple generation
            print("Testing with simple generation...")
            response = self.client.models.generate_content(
                model=self.model_name,
                contents="Hello",
                config=types.GenerateContentConfig(temperature=0.7)
            )
            print(f"Gemini AUTH SUCCESS: {response.text}")
            return True
        except Exception as e:
            print(f"Gemini AUTH FAILED: {type(e).__name__}: {str(e)}")
            traceback.print_exc()
            return False
    
    def generate_response(self, prompt: str) -> str:
        """
        Generate a response from the LLM based on the provided prompt.
        
        Args:
            prompt: The prompt to send to the LLM
            
        Returns:
            The generated response as a string
        """
        if self.client is None:
            return "I'm sorry, the Gemini service is currently unavailable. Please check your API configuration."
            
        try:
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=prompt,
                config=types.GenerateContentConfig(temperature=0.7)
            )
            return response.text
        except Exception as e:
            print(f"Error generating response from Gemini LLM: {type(e).__name__}: {e}")
            traceback.print_exc()
            return "I'm sorry, I encountered an error while processing your request with Gemini API. Please try again later."
    
    def generate_from_messages(self, messages: List[Dict[str, str]]) -> str:
        """
        Generate a response from the Gemini LLM based on a list of messages.
        Each message should have a 'role' (either 'user' or 'assistant') and 'content'.
        """
        if self.client is None:
            return "I'm sorry, the Gemini service is currently unavailable. Please check your API configuration."
            
        try:
            # Convert messages to google-genai format
            formatted_contents = []
            for message in messages:
                role = "user" if message['role'] == "user" else "model"
                formatted_contents.append(types.Content(
                    role=role,
                    parts=[types.Part.from_text(text=message['content'])]
                ))
            
            # Generate the response
            response = self.client.models.generate_content(
                model=self.model_name,
                contents=formatted_contents,
                config=types.GenerateContentConfig(temperature=0.7)
            )
            return response.text
        except Exception as e:
            print(f"Error generating response from Gemini LLM: {type(e).__name__}: {e}")
            traceback.print_exc()
            return "I'm sorry, I encountered an error while processing your request with Gemini API. Please try again later."