import os
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Configure the API key
api_key = os.getenv('GEMINI_API_KEY')
print(f"API Key: {api_key[:10]}...")
genai.configure(api_key=api_key)

# Get the model
model_name = "models/gemini-1.5-flash"
model = genai.GenerativeModel(model_name)

# Generate a response
print(f"Testing model: {model_name}")
response = model.generate_content("Hello, how are you?")
print("Response:")
print(response.text)