import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the API key
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

# List available models
print("Available Gemini models:")
for model in genai.list_models():
    if "gemini" in model.name.lower():
        print(f"- {model.name}")
        print(f"  Supported generation methods: {model.supported_generation_methods}")