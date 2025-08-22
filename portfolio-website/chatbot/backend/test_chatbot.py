import requests
import json
import os
import sys
import traceback

# Add the parent directory to the path so we can import from app
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

# Import the chatbot components directly for testing
from app.llm_manager import LLMManager
from app.rag_system import RAGSystem
from app.chatbot import PortfolioChatbot

def test_api_connection():
    """
    Test the connection to the API.
    """
    try:
        response = requests.get("http://localhost:8000/health")
        if response.status_code == 200:
            print("✅ API connection successful")
            return True
        else:
            print(f"❌ API connection failed with status code {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ API connection failed with error: {e}")
        return False

def test_chat_endpoint():
    """
    Test the chat endpoint with a sample message.
    """
    try:
        # Test greeting
        greeting_response = requests.post(
            "http://localhost:8000/chat",
            json={"message": "Hello", "session_id": "test-session"}
        )
        
        if greeting_response.status_code == 200:
            print("✅ Chat endpoint (greeting) successful")
            print(f"Response: {greeting_response.json()['response']}")
        else:
            print(f"❌ Chat endpoint (greeting) failed with status code {greeting_response.status_code}")
            print(f"Response: {greeting_response.text}")
            return False
        
        # Test project query
        project_response = requests.post(
            "http://localhost:8000/chat",
            json={"message": "Tell me about your projects", "session_id": "test-session"}
        )
        
        if project_response.status_code == 200:
            print("✅ Chat endpoint (project query) successful")
            print(f"Response: {project_response.json()['response']}")
        else:
            print(f"❌ Chat endpoint (project query) failed with status code {project_response.status_code}")
            print(f"Response: {project_response.text}")
            return False
            
        return True
    except Exception as e:
        print(f"❌ Chat endpoint test failed with error: {e}")
        return False

def test_direct_components():
    """
    Test the chatbot components directly without going through the API.
    """
    try:
        # Initialize components
        print("Initializing LLM Manager...")
        llm_manager = LLMManager()
        
        print("Initializing RAG System...")
        rag_system = RAGSystem()
        
        print("Initializing Portfolio Chatbot...")
        chatbot = PortfolioChatbot(llm_manager, rag_system)
        
        # Test chatbot with a simple query
        print("\nTesting chatbot with a simple query...")
        try:
            response = chatbot.chat("Hello, who are you?")
            print(f"✅ Greeting test successful")
            print(f"Response: {response}")
        except Exception as e:
            print(f"❌ Greeting test failed with error: {e}")
            traceback.print_exc()
        
        # Test chatbot with a project query
        print("\nTesting chatbot with a project query...")
        try:
            response = chatbot.chat("What projects have you worked on?")
            print(f"✅ Project query test successful")
            print(f"Response: {response}")
        except Exception as e:
            print(f"❌ Project query test failed with error: {e}")
            traceback.print_exc()
        
        # Test chatbot with a resume query
        print("\nTesting chatbot with a resume query...")
        try:
            response = chatbot.chat("Tell me about your experience")
            print(f"✅ Resume query test successful")
            print(f"Response: {response}")
        except Exception as e:
            print(f"❌ Resume query test failed with error: {e}")
            traceback.print_exc()
        
        return True
    except Exception as e:
        print(f"❌ Direct component test failed with error: {e}")
        traceback.print_exc()
        return False

def main():
    print("=== Testing Portfolio Chatbot ===\n")
    
    # First check if the API is running
    api_running = test_api_connection()
    
    if api_running:
        # If the API is running, test the chat endpoint
        print("\n=== Testing Chat Endpoint ===\n")
        test_chat_endpoint()
    else:
        # If the API is not running, test the components directly
        print("\n=== Testing Components Directly ===\n")
        try:
            # Print the current directory and Python path for debugging
            print(f"Current directory: {os.getcwd()}")
            print(f"Python path: {sys.path}")
            print("\nAttempting to import required modules...")
            
            # Try importing each module separately to identify any issues
            try:
                from app.llm_manager import LLMManager
                print("✅ Successfully imported LLMManager")
            except Exception as e:
                print(f"❌ Failed to import LLMManager: {e}")
                traceback.print_exc()
            
            try:
                from app.rag_system import RAGSystem
                print("✅ Successfully imported RAGSystem")
            except Exception as e:
                print(f"❌ Failed to import RAGSystem: {e}")
                traceback.print_exc()
            
            try:
                from app.chatbot import PortfolioChatbot
                print("✅ Successfully imported PortfolioChatbot")
            except Exception as e:
                print(f"❌ Failed to import PortfolioChatbot: {e}")
                traceback.print_exc()
            
            # Now run the direct component tests
            test_direct_components()
        except Exception as e:
            print(f"❌ Setup for direct testing failed: {e}")
            traceback.print_exc()
    
    print("\n=== Testing Complete ===\n")

if __name__ == "__main__":
    main()