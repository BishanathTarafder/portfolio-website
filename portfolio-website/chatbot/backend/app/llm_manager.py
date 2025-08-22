from langchain_groq import ChatGroq
import os
from typing import List, Dict, Any
from langchain_core.messages import HumanMessage, AIMessage

class LLMManager:
    """
    Manages interactions with the LLM provider.
    Currently supports Groq, but can be extended to support other providers.
    """
    def __init__(self):
        self.provider = os.getenv('LLM_PROVIDER', 'groq')
        self.model_name = os.getenv('MODEL_NAME', 'llama2-70b-4096')
        self.api_key = os.getenv('GROQ_API_KEY')
        
        if not self.api_key:
            raise ValueError("LLM API key not found in environment variables")
            
        self.llm = self._initialize_llm()
    
    def _initialize_llm(self):
        """
        Initialize the LLM based on the provider specified in environment variables.
        """
        if self.provider.lower() == 'groq':
            return ChatGroq(
                groq_api_key=self.api_key,
                model_name=self.model_name,
                temperature=0.7
            )
        else:
            raise ValueError(f"Unsupported LLM provider: {self.provider}")
    
    def generate_response(self, prompt: str) -> str:
        """
        Generate a response from the LLM based on the provided prompt.
        
        Args:
            prompt: The prompt to send to the LLM
            
        Returns:
            The generated response as a string
        """
        try:
            response = self.llm.invoke(prompt)
            return response.content
        except Exception as e:
            print(f"Error generating response from LLM: {e}")
            return "I'm sorry, I encountered an error while processing your request."
    
    def generate_from_messages(self, messages: List[Dict[str, str]]) -> str:
        """
        Generate a response from the LLM based on a list of messages.
        
        Args:
            messages: A list of message dictionaries with 'role' and 'content' keys
            
        Returns:
            The generated response as a string
        """
        try:
            # Convert to LangChain message format
            lc_messages = []
            for msg in messages:
                if msg['role'] == 'user':
                    lc_messages.append(HumanMessage(content=msg['content']))
                elif msg['role'] == 'assistant':
                    lc_messages.append(AIMessage(content=msg['content']))
            
            response = self.llm.invoke(lc_messages)
            return response.content
        except Exception as e:
            print(f"Error generating response from LLM: {e}")
            return "I'm sorry, I encountered an error while processing your request."