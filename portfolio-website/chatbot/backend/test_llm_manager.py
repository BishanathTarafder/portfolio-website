import os
from dotenv import load_dotenv
from app.llm_manager import LLMManager

# Load environment variables
load_dotenv()

# Print environment variables
print(f"OPENAI_API_KEY: {os.getenv('OPENAI_API_KEY')[:5]}...")
print(f"MODEL_NAME: {os.getenv('MODEL_NAME')}")

try:
    # Initialize LLM Manager
    llm_manager = LLMManager()
    print(f"\nInitialized LLM Manager with provider: {llm_manager.provider}, model: {llm_manager.model_name}")
    
    # Test with a simple message
    messages = [
        {"role": "user", "content": "Hello, how are you?"}
    ]
    
    print("\nGenerating response...")
    response = llm_manager.generate_from_messages(messages)
    print(f"Response: {response}")
    print("\nSuccess!")
except Exception as e:
    print(f"Error: {e}")