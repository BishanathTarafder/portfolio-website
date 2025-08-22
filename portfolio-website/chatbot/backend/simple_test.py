import os
import sys
import traceback

# Add the current directory to the path
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

try:
    print("Importing modules...")
    from app.llm_manager import LLMManager
    from app.rag_system import RAGSystem
    from app.chatbot import PortfolioChatbot
    
    print("\nInitializing components...")
    llm_manager = LLMManager()
    rag_system = RAGSystem()
    chatbot = PortfolioChatbot(llm_manager, rag_system)
    
    print("\nTesting greeting...")
    response = chatbot.chat("Hello, who are you?")
    print(f"Response: {response}")
    
    print("\nTesting project query...")
    response = chatbot.chat("Tell me about your projects")
    print(f"Response: {response}")
    
    print("\nTesting resume query...")
    response = chatbot.chat("What's your experience?")
    print(f"Response: {response}")
    
    print("\nTest completed successfully!")
    
except Exception as e:
    print(f"Error: {e}")
    traceback.print_exc()