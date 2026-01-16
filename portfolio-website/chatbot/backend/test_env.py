from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Print environment variables
print('GOOGLE_API_KEY:', os.getenv('GOOGLE_API_KEY'))
print('LLM_PROVIDER:', os.getenv('LLM_PROVIDER'))
print('MODEL_NAME:', os.getenv('MODEL_NAME'))