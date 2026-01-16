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

# ISSUE 1: Debug OpenAI API Key Authentication
openai_key = os.getenv('OPENAI_API_KEY')
print(f"\n=== ISSUE 1: Debug OpenAI API Key Authentication ===")
print(f"DEBUG: OpenAI key present: {bool(openai_key)}")
print(f"DEBUG: OpenAI key starts with 'sk-': {openai_key.startswith('sk-') if openai_key else False}")
print(f"DEBUG: OpenAI key length: {len(openai_key) if openai_key else 0}")

# Test if other environment variables are loading properly
print(f"\nOther environment variables:")
print(f"LLM_PROVIDER: {os.getenv('LLM_PROVIDER')}")
print(f"MODEL_NAME: {os.getenv('MODEL_NAME')}")

try:
    # Import the LLM manager
    print("\n=== Importing LLM Manager ===")
    from app.llm_manager import LLMManager
    
    # Create a test class that extends LLMManager to add the test_openai_auth method
    class TestLLMManager(LLMManager):
        def test_openai_auth(self):
            """Test OpenAI authentication directly"""
            print("\n=== ISSUE 2: Test OpenAI Authentication Directly ===")
            try:
                from langchain_openai import ChatOpenAI
                import openai
                
                # Print OpenAI module version
                print(f"OpenAI module version: {openai.__version__}")
                
                # Test with explicit API key
                print("Testing with explicit API key...")
                test_llm = ChatOpenAI(
                    openai_api_key=os.getenv('OPENAI_API_KEY'),
                    model_name='gpt-3.5-turbo'
                )
                
                response = test_llm.invoke("Hello")
                print(f"OpenAI AUTH SUCCESS: {response.content}")
                return True
            except openai.AuthenticationError as e:
                print(f"OpenAI AUTH FAILED (Authentication Error): {str(e)}")
                return False
            except openai.RateLimitError as e:
                print(f"OpenAI AUTH FAILED (Rate Limit Error): {str(e)}")
                return False
            except Exception as e:
                print(f"OpenAI AUTH FAILED: {type(e).__name__}: {str(e)}")
                traceback.print_exc()
                return False
        
        def test_direct_openai_client(self):
            """Test OpenAI client directly without LangChain"""
            print("\n=== ISSUE 3: Test Direct OpenAI Client ===")
            try:
                import openai
                
                # Configure the client with the API key
                client = openai.OpenAI(api_key=os.getenv('OPENAI_API_KEY'))
                
                # Make a simple completion request
                response = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {"role": "system", "content": "You are a helpful assistant."},
                        {"role": "user", "content": "Hello, how are you?"}
                    ]
                )
                
                print(f"Direct OpenAI client SUCCESS: {response.choices[0].message.content}")
                return True
            except openai.AuthenticationError as e:
                print(f"Direct OpenAI client FAILED (Authentication Error): {str(e)}")
                return False
            except openai.RateLimitError as e:
                print(f"Direct OpenAI client FAILED (Rate Limit Error): {str(e)}")
                return False
            except Exception as e:
                print(f"Direct OpenAI client FAILED: {type(e).__name__}: {str(e)}")
                traceback.print_exc()
                return False
    
    # Create an instance of the test class
    print("\n=== Creating Test LLM Manager ===")
    test_manager = TestLLMManager()
    
    # Print the API key information from the manager
    print(f"\n=== ISSUE 4: LLM Manager API Key Information ===")
    print(f"API key present in manager: {bool(test_manager.api_key)}")
    print(f"API key starts with 'sk-': {test_manager.api_key.startswith('sk-') if test_manager.api_key else False}")
    print(f"API key length in manager: {len(test_manager.api_key) if test_manager.api_key else 0}")
    
    # Test OpenAI authentication
    test_manager.test_openai_auth()
    
    # Test direct OpenAI client
    test_manager.test_direct_openai_client()
    
    # Test generate_response with error handling
    print("\n=== ISSUE 5: Test generate_response with Error Handling ===")
    try:
        response = test_manager.generate_response("Hello, how are you?")
        print(f"generate_response SUCCESS: {response}")
    except Exception as e:
        print(f"generate_response FAILED: {type(e).__name__}: {str(e)}")
        traceback.print_exc()
    
except Exception as e:
    print(f"\n=== ERROR: {type(e).__name__}: {str(e)} ===")
    traceback.print_exc()

print("\n=== Test completed ===")