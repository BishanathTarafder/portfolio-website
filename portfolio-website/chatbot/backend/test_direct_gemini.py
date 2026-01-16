import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
load_dotenv()

# Get API key
api_key = os.getenv('GOOGLE_API_KEY')
print(f"API Key: {api_key[:5]}...")

try:
    # Configure the API
    genai.configure(api_key=api_key)
    
    # List available models
    models = genai.list_models()
    print("Available models:")
    for model in models:
        print(f"- {model.name}")
    
    # Select a model (using one from the available list)
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    # Generate a response
    response = model.generate_content("Hello, how are you?")
    print("\nResponse:")
    print(response.text)
    print("\nSuccess!")
except Exception as e:
    print(f"Error: {e}")