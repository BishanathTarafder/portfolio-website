import os
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
model_name = os.getenv("MODEL_NAME", "gemini-3-flash-preview")

print(f"API Key present: {bool(api_key)}")
print(f"Model Name: {model_name}")

if not api_key:
    print("Error: GEMINI_API_KEY not found in environment variables.")
    exit(1)

# Initialize Client
print("\n--- Attempting Default Initialization (v1) ---")
try:
    client = genai.Client(api_key=api_key)
    response = client.models.generate_content(
        model=model_name,
        contents="Hello, are you working?",
        config=types.GenerateContentConfig(temperature=0.7)
    )
    print("Success with default client!")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Default client failed: {e}")

# Try v1alpha if default fails or just to test
print("\n--- Attempting v1alpha Initialization ---")
try:
    client_alpha = genai.Client(api_key=api_key, http_options={'api_version': 'v1alpha'})
    response = client_alpha.models.generate_content(
        model=model_name,
        contents="Hello, are you working via v1alpha?",
        config=types.GenerateContentConfig(temperature=0.7)
    )
    print("Success with v1alpha client!")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"v1alpha client failed: {e}")

# Try v1beta if others fail
print("\n--- Attempting v1beta Initialization ---")
try:
    client_beta = genai.Client(api_key=api_key, http_options={'api_version': 'v1beta'})
    response = client_beta.models.generate_content(
        model=model_name,
        contents="Hello, are you working via v1beta?",
        config=types.GenerateContentConfig(temperature=0.7)
    )
    print("Success with v1beta client!")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"v1beta client failed: {e}")
