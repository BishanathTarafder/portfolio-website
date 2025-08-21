from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
import os
from typing import List, Dict, Any, Optional
import uuid

# Import LangGraph components
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_experimental.utilities import PythonREPL
from langchain.graphs import Neo4jGraph
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END

# Load environment variables
from dotenv import load_dotenv
load_dotenv()

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
    messages: List[Message]
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    message: str
    session_id: str

# In-memory session storage
active_sessions = {}

# Define LangGraph workflow
def create_chat_graph():
    # Initialize LLM
    llm = ChatOpenAI(temperature=0.7)
    
    # Define states and transitions
    workflow = StateGraph(name="portfolio_chatbot")
    
    # Define the initial state
    workflow.add_node("process_input", process_input)
    
    # Add specialized nodes for different types of queries
    workflow.add_node("handle_greeting", handle_greeting)
    workflow.add_node("handle_about_me", handle_about_me)
    workflow.add_node("handle_projects", handle_projects)
    workflow.add_node("handle_contact", handle_contact)
    workflow.add_node("handle_general", handle_general)
    
    # Define the router function
    workflow.add_conditional_edges(
        "process_input",
        router,
        {
            "greeting": "handle_greeting",
            "about_me": "handle_about_me",
            "projects": "handle_projects",
            "contact": "handle_contact",
            "general": "handle_general",
        }
    )
    
    # All handlers lead to the end
    workflow.add_edge("handle_greeting", END)
    workflow.add_edge("handle_about_me", END)
    workflow.add_edge("handle_projects", END)
    workflow.add_edge("handle_contact", END)
    workflow.add_edge("handle_general", END)
    
    # Set the entry point
    workflow.set_entry_point("process_input")
    
    return workflow.compile()

# Define the node functions
def process_input(state):
    """Process the user input and prepare for routing"""
    messages = state["messages"]
    last_message = messages[-1].content if messages else ""
    
    return {"messages": messages, "last_input": last_message}

def router(state):
    """Route the conversation based on the user's intent"""
    last_input = state["last_input"].lower()
    
    # Simple intent detection
    if any(greeting in last_input for greeting in ["hello", "hi", "hey", "greetings"]):
        return "greeting"
    elif any(about in last_input for about in ["who are you", "about you", "your background", "your skills", "tell me about yourself"]):
        return "about_me"
    elif any(project in last_input for project in ["project", "portfolio", "work", "showcase"]):
        return "projects"
    elif any(contact in last_input for contact in ["contact", "email", "reach", "connect"]):
        return "contact"
    else:
        return "general"

def handle_greeting(state):
    """Handle greeting messages"""
    messages = state["messages"]
    
    response = f"Hello! I'm the portfolio assistant for {personal_info.get('name', 'the portfolio owner')}. "
    response += "I can tell you about their background, skills, projects, or how to get in touch. "
    response += "What would you like to know?"
    
    messages.append(AIMessage(content=response))
    return {"messages": messages}

def handle_about_me(state):
    """Handle queries about the portfolio owner"""
    messages = state["messages"]
    
    name = personal_info.get('name', 'the portfolio owner')
    title = personal_info.get('title', 'AI Engineer')
    summary = personal_info.get('summary', 'An experienced professional')
    skills = personal_info.get('skills', {})
    
    response = f"{name} is a {title}. {summary}\n\n"
    
    # Add skills information
    if skills:
        response += "Skills:\n"
        for category, skill_list in skills.items():
            response += f"- {category}: {', '.join(skill_list)}\n"
    
    messages.append(AIMessage(content=response))
    return {"messages": messages}

def handle_projects(state):
    """Handle queries about projects"""
    messages = state["messages"]
    
    if not projects_data:
        response = "I don't have any project information available at the moment."
    else:
        response = "Here are some notable projects:\n\n"
        
        for project in projects_data:
            response += f"**{project.get('title', 'Untitled Project')}**\n"
            response += f"{project.get('description', 'No description available')}\n"
            response += f"Technologies: {', '.join(project.get('technologies', []))}\n"
            
            if project.get('github_link'):
                response += f"GitHub: {project.get('github_link')}\n"
                
            response += "\n"
    
    messages.append(AIMessage(content=response))
    return {"messages": messages}

def handle_contact(state):
    """Handle contact information requests"""
    messages = state["messages"]
    
    contact_info = personal_info.get('contact', {})
    
    if not contact_info:
        response = "I don't have contact information available at the moment."
    else:
        response = "Here's how you can get in touch:\n\n"
        
        if contact_info.get('email'):
            response += f"Email: {contact_info.get('email')}\n"
        
        if contact_info.get('linkedin'):
            response += f"LinkedIn: {contact_info.get('linkedin')}\n"
        
        if contact_info.get('github'):
            response += f"GitHub: {contact_info.get('github')}\n"
        
        if contact_info.get('twitter'):
            response += f"Twitter: {contact_info.get('twitter')}\n"
    
    messages.append(AIMessage(content=response))
    return {"messages": messages}

def handle_general(state):
    """Handle general queries with LLM"""
    messages = state["messages"]
    last_input = state["last_input"]
    
    # Create a system prompt with context about the portfolio owner
    system_prompt = f"""You are a helpful assistant for {personal_info.get('name', 'the portfolio owner')}'s portfolio website. 
    You have information about their background, skills, and projects. 
    If you don't know the answer to a question, politely say so and suggest the visitor explore the portfolio website for more information.
    Keep your responses concise and helpful."""
    
    # Prepare the prompt with conversation history
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="history"),
        ("human", "{input}")
    ])
    
    # Create the chain
    chain = prompt | ChatOpenAI(temperature=0.7) | StrOutputParser()
    
    # Extract conversation history
    history = messages[:-1] if messages else []
    
    # Generate response
    try:
        response = chain.invoke({"history": history, "input": last_input})
    except Exception as e:
        response = "I'm still learning, but you can check the portfolio for more information."
    
    messages.append(AIMessage(content=response))
    return {"messages": messages}

# Initialize the chat graph
chat_graph = create_chat_graph()

# API endpoints
@app.get("/")
async def root():
    return {"message": "Portfolio Chatbot API is running"}

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    # Create or retrieve session
    session_id = request.session_id or str(uuid.uuid4())
    
    # Initialize or get session state
    if session_id not in active_sessions:
        active_sessions[session_id] = {"messages": []}
    
    # Convert Pydantic messages to LangChain messages
    messages = active_sessions[session_id]["messages"]
    
    # Add the new message
    for msg in request.messages:
        if msg.role == "user":
            messages.append(HumanMessage(content=msg.content))
        elif msg.role == "assistant":
            messages.append(AIMessage(content=msg.content))
    
    # Process with LangGraph
    try:
        result = chat_graph.invoke({"messages": messages})
        updated_messages = result["messages"]
        
        # Update session with new messages
        active_sessions[session_id]["messages"] = updated_messages
        
        # Get the last assistant message
        last_message = updated_messages[-1].content if updated_messages else ""
        
        return ChatResponse(message=last_message, session_id=session_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")

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
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)