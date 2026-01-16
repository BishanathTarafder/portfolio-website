import os
import sys
import traceback
from dotenv import load_dotenv

# Add the current directory to the path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Load environment variables and print current working directory
print(f"Current working directory: {os.getcwd()}")
load_dotenv()
print(f"Loaded .env file from: {os.path.join(os.getcwd(), '.env')}")

# Debug Gemini API Key
gemini_key = os.getenv('GEMINI_API_KEY')
print(f"\n=== Debug Gemini API Key ===")
print(f"DEBUG: Gemini key present: {bool(gemini_key)}")
print(f"DEBUG: Gemini key length: {len(gemini_key) if gemini_key else 0}")

# Test if other environment variables are loading properly
print(f"\nOther environment variables:")
print(f"LLM_PROVIDER: {os.getenv('LLM_PROVIDER')}")
print(f"MODEL_NAME: {os.getenv('MODEL_NAME')}")

try:
    # Import the LLM manager
    print("\n=== Importing LLM Manager ===")
    from app.llm_manager import LLMManager
    
    # Create an instance of the LLM manager
    print("\n=== Creating LLM Manager ===")
    llm_manager = LLMManager()
    
    # Print the API key information from the manager
    print(f"\n=== LLM Manager API Key Information ===")
    print(f"API key present in manager: {bool(llm_manager.api_key)}")
    print(f"API key length in manager: {len(llm_manager.api_key) if llm_manager.api_key else 0}")
    
    # Test Gemini authentication
    llm_manager.test_gemini_auth()
    
    # Test generate_response with error handling
    print("\n=== Test generate_response with Gemini ===")
    try:
        response = llm_manager.generate_response("Hello, how are you?")
        print(f"generate_response SUCCESS: {response}")
    except Exception as e:
        print(f"generate_response FAILED: {type(e).__name__}: {str(e)}")
        traceback.print_exc()
    
    # Test with a conversation
    print("\n=== Test conversation with Gemini ===")
    try:
        messages = [
            {"role": "user", "content": "What can you tell me about AI?"},
            {"role": "assistant", "content": "AI is a field of computer science focused on creating systems that can perform tasks that typically require human intelligence."},
            {"role": "user", "content": "What are some applications of AI?"}
        ]
        response = llm_manager.generate_from_messages(messages)
        print(f"generate_from_messages SUCCESS: {response}")
    except Exception as e:
        print(f"generate_from_messages FAILED: {type(e).__name__}: {str(e)}")
        traceback.print_exc()
    
except Exception as e:
    print(f"\n=== ERROR: {type(e).__name__}: {str(e)} ===")
    traceback.print_exc()

print("\n=== Test completed ===")