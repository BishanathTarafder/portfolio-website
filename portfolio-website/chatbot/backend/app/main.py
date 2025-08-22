from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
import logging
from typing import List, Dict, Any, Optional
import uuid

# Import LangGraph components
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser

# Import custom components
from app.llm_manager import LLMManager
from app.rag_system import RAGSystem
from app.chatbot import PortfolioChatbot

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Initialize FastAPI app
app = FastAPI(title="Portfolio Chatbot API", description="API for portfolio website chatbot using LangGraph")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load project data
def load_data(file_path):
    try:
        with open(file_path, 'r') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading data from {file_path}: {e}")
        return {}

# Load project and personal information
projects_data = load_data("../data/projects.json")
personal_info = load_data("../data/personal_info.json")

# Define data models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# In-memory session storage
active_sessions = {}

# Initialize components
try:
    llm_manager = LLMManager()
    logging.info("LLM Manager initialized successfully")
    
    rag_system = RAGSystem()
    logging.info("RAG System initialized successfully")
    
    chatbot = PortfolioChatbot(llm_manager, rag_system)
    logging.info("Portfolio Chatbot initialized successfully")
except Exception as e:
    logging.error(f"Error initializing components: {e}")
    # We'll continue running the API, but chatbot functionality will be limited
    
    # API endpoints
@app.post("/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Process a chat message and return a response.
    """
    try:
        # Generate a session ID if not provided
        session_id = request.session_id or str(uuid.uuid4())
        
        # Get or create conversation history for this session
        if session_id not in active_sessions:
            active_sessions[session_id] = []
        
        # Add user message to history
        active_sessions[session_id].append({"role": "user", "content": request.message})
        
        # Process the message using the chatbot with conversation history
        response = chatbot.chat(request.message, active_sessions[session_id])
        
        # Add assistant response to history
        active_sessions[session_id].append({"role": "assistant", "content": response})
        
        # Return the response
        return ChatResponse(
            response=response,
            session_id=session_id
        )
    except Exception as e:
        logging.error(f"Error processing chat request: {e}")
        raise HTTPException(
            status_code=500,
            detail="An error occurred while processing your request"
        )

@app.get("/health")
async def health_check():
    """
    Check if the API is healthy.
    """
    return {"status": "healthy"}

@app.get("/")
async def root():
    """
    Root endpoint for API information.
    """
    return {
        "name": "Portfolio Chatbot API",
        "version": "1.0.0",
        "description": "API for portfolio website chatbot using LangGraph and RAG"
    }

# Error handling
@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={"message": f"An unexpected error occurred: {str(exc)}"},
    )

# Run the application
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)