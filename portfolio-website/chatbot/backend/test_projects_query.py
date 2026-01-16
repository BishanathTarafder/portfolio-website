import os
import sys
import json
import logging
import traceback

# Configure logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')

# Add the app directory to the path so we can import modules
sys.path.append(os.path.join(os.path.dirname(__file__), 'app'))

# Import the chatbot module
from chatbot import PortfolioChatbot
from llm_manager import LLMManager
from rag import RAGSystem

def test_projects_query():
    """Test the projects query handling in isolation"""
    try:
        # Initialize components
        llm = LLMManager()
        rag = RAGSystem(llm)
        chatbot = PortfolioChatbot(llm, rag)
        
        # Test projects data loading
        print("\n=== Testing Projects Data Loading ===")
        print(f"Projects data loaded: {bool(chatbot.projects_data)}")
        print(f"Number of projects: {len(chatbot.projects_data)}")
        
        if chatbot.projects_data:
            print(f"First project title: {chatbot.projects_data[0].get('title', 'No title')}")
        
        # Test projects query handling
        print("\n=== Testing Projects Query Handling ===")
        test_query = "Tell me about your projects"
        print(f"Test query: {test_query}")
        
        try:
            # Test the handle_projects method directly
            state = {"query": test_query, "context": "", "response": "", "conversation_history": []}
            result = chatbot.handle_projects(state)
            print(f"Response: {result['response'][:100]}...")
            print("Projects query handling successful!")
        except Exception as e:
            print(f"Error in handle_projects: {type(e).__name__}: {str(e)}")
            print(f"Traceback: {traceback.format_exc()}")
        
        # Test the full chat flow with a projects query
        print("\n=== Testing Full Chat Flow with Projects Query ===")
        try:
            response = chatbot.chat(test_query)
            print(f"Full chat response: {response[:100]}...")
            print("Full chat flow successful!")
        except Exception as e:
            print(f"Error in chat flow: {type(e).__name__}: {str(e)}")
            print(f"Traceback: {traceback.format_exc()}")
            
    except Exception as e:
        print(f"Test failed: {type(e).__name__}: {str(e)}")
        print(f"Traceback: {traceback.format_exc()}")

if __name__ == "__main__":
    test_projects_query()