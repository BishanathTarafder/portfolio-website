import os
import traceback
from dotenv import load_dotenv
from app.llm_manager import LLMManager

# Load environment variables
load_dotenv()

# Print environment configuration
print("=== Environment Configuration ===")
print(f"LLM Provider: {os.getenv('LLM_PROVIDER')}")
print(f"Model Name: {os.getenv('MODEL_NAME')}")
print(f"API Key present: {bool(os.getenv('GEMINI_API_KEY'))}")
print()

# Test LLM Manager
print("=== Testing LLM Manager ===")
try:
    # Initialize LLM Manager
    llm_manager = LLMManager()
    
    # Test authentication
    auth_result = llm_manager.test_gemini_auth()
    print(f"Authentication test result: {auth_result}")
    
    if auth_result:
        # Test response generation
        print("\n=== Testing Response Generation ===")
        response = llm_manager.generate_response("What are some applications of AI?")
        print(f"Response:\n{response}")
        
        # Test message-based response generation
        print("\n=== Testing Message-Based Response Generation ===")
        messages = [
            {"role": "user", "content": "Hello, who are you?"}
        ]
        response = llm_manager.generate_from_messages(messages)
        print(f"Response:\n{response}")
    
except Exception as e:
    print(f"Error during testing: {type(e).__name__}: {e}")
    traceback.print_exc()

print("\n=== Test completed ===")