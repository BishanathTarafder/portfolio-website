import os
from dotenv import load_dotenv
from google import genai
from google.genai import types

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv('GEMINI_API_KEY')
if not api_key:
    print("GEMINI_API_KEY not found in environment variables.")
    exit(1)
    
print(f"API Key: {api_key[:5]}...")

try:
    # Initialize the LLM
    client = genai.Client(api_key=api_key)
    model_name = os.getenv('MODEL_NAME', 'gemini-3-flash-preview')
    
    # Test the LLM
    print(f"Testing with model: {model_name}")
    response = client.models.generate_content(
        model=model_name,
        contents="Hello, how are you?",
        config=types.GenerateContentConfig(temperature=0.7)
    )
    print("Response:", response.text)
    print("Success!")
except Exception as e:
    print(f"Error: {e}")
