from typing import Dict, List, Any, TypedDict, Annotated, Literal
from langchain_core.messages import HumanMessage, AIMessage, SystemMessage
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI
from langgraph.graph import StateGraph, END
import json
import os
from .utils import load_json_data, get_data_path

# Define the state schema
class ChatState(TypedDict):
    messages: List[Any]  # List of messages
    last_input: str  # Last user input
    intent: str  # Detected intent
    projects_data: Dict[str, Any]  # Project data
    personal_info: Dict[str, Any]  # Personal info

# Load data
def load_data():
    projects_data = load_json_data(get_data_path("projects.json"))
    personal_info = load_json_data(get_data_path("personal_info.json"))
    return projects_data, personal_info

# Create the LangGraph workflow
def create_chat_graph():
    # Load data
    projects_data, personal_info = load_data()
    
    # Initialize LLM
    llm = ChatOpenAI(temperature=0.7)
    
    # Define the graph
    workflow = StateGraph(ChatState)
    
    # Define nodes
    
    # Process input node - extracts the last message and prepares for routing
    def process_input(state: ChatState) -> ChatState:
        messages = state["messages"]
        last_message = messages[-1].content if messages and isinstance(messages[-1], HumanMessage) else ""
        
        return {**state, "last_input": last_message}
    
    # Intent detection node - determines what the user is asking about
    def detect_intent(state: ChatState) -> ChatState:
        last_input = state["last_input"].lower()
        
        # Simple intent detection
        if any(greeting in last_input for greeting in ["hello", "hi", "hey", "greetings"]):
            intent = "greeting"
        elif any(about in last_input for about in ["who are you", "about you", "your background", "your skills", "tell me about yourself"]):
            intent = "about_me"
        elif any(project in last_input for project in ["project", "portfolio", "work", "showcase"]):
            intent = "projects"
        elif any(contact in last_input for contact in ["contact", "email", "reach", "connect"]):
            intent = "contact"
        else:
            intent = "general"
        
        return {**state, "intent": intent}
    
    # Handle greeting intent
    def handle_greeting(state: ChatState) -> ChatState:
        messages = state["messages"]
        name = state["personal_info"].get("name", "the portfolio owner")
        
        response = f"Hello! I'm the portfolio assistant for {name}. "
        response += "I can tell you about their background, skills, projects, or how to get in touch. "
        response += "What would you like to know?"
        
        messages.append(AIMessage(content=response))
        return {**state, "messages": messages}
    
    # Handle about_me intent
    def handle_about_me(state: ChatState) -> ChatState:
        messages = state["messages"]
        personal_info = state["personal_info"]
        
        name = personal_info.get("name", "the portfolio owner")
        title = personal_info.get("title", "AI Engineer")
        summary = personal_info.get("summary", "An experienced professional")
        skills = personal_info.get("skills", {})
        
        response = f"{name} is a {title}. {summary}\n\n"
        
        # Add skills information
        if skills:
            response += "Skills:\n"
            for category, skill_list in skills.items():
                response += f"- {category}: {', '.join(skill_list)}\n"
        
        messages.append(AIMessage(content=response))
        return {**state, "messages": messages}
    
    # Handle projects intent
    def handle_projects(state: ChatState) -> ChatState:
        messages = state["messages"]
        projects_data = state["projects_data"]
        
        if not projects_data:
            response = "I don't have any project information available at the moment."
        else:
            response = "Here are some notable projects:\n\n"
            
            for project in projects_data:
                response += f"**{project.get('title', 'Untitled Project')}**\n"
                response += f"{project.get('description', 'No description available')}\n"
                response += f"Technologies: {', '.join(project.get('technologies', []))}\n"
                
                if project.get("github_link"):
                    response += f"GitHub: {project.get('github_link')}\n"
                    
                response += "\n"
        
        messages.append(AIMessage(content=response))
        return {**state, "messages": messages}
    
    # Handle contact intent
    def handle_contact(state: ChatState) -> ChatState:
        messages = state["messages"]
        personal_info = state["personal_info"]
        
        contact_info = personal_info.get("contact", {})
        
        if not contact_info:
            response = "I don't have contact information available at the moment."
        else:
            response = "Here's how you can get in touch:\n\n"
            
            if contact_info.get("email"):
                response += f"Email: {contact_info.get('email')}\n"
            
            if contact_info.get("linkedin"):
                response += f"LinkedIn: {contact_info.get('linkedin')}\n"
            
            if contact_info.get("github"):
                response += f"GitHub: {contact_info.get('github')}\n"
            
            if contact_info.get("twitter"):
                response += f"Twitter: {contact_info.get('twitter')}\n"
        
        messages.append(AIMessage(content=response))
        return {**state, "messages": messages}
    
    # Handle general intent with LLM
    def handle_general(state: ChatState) -> ChatState:
        messages = state["messages"]
        last_input = state["last_input"]
        personal_info = state["personal_info"]
        
        name = personal_info.get("name", "the portfolio owner")
        
        # Create a system prompt with context about the portfolio owner
        system_prompt = f"""You are a helpful assistant for {name}'s portfolio website. 
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
        return {**state, "messages": messages}
    
    # Add nodes to the graph
    workflow.add_node("process_input", process_input)
    workflow.add_node("detect_intent", detect_intent)
    workflow.add_node("handle_greeting", handle_greeting)
    workflow.add_node("handle_about_me", handle_about_me)
    workflow.add_node("handle_projects", handle_projects)
    workflow.add_node("handle_contact", handle_contact)
    workflow.add_node("handle_general", handle_general)
    
    # Define edges
    workflow.add_edge("process_input", "detect_intent")
    
    # Conditional routing based on intent
    workflow.add_conditional_edges(
        "detect_intent",
        lambda state: state["intent"],
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

# Initialize the chat graph
chat_graph = create_chat_graph()

# Function to invoke the graph with a new message
def process_message(messages, session_data=None):
    # Load data
    projects_data, personal_info = load_data()
    
    # Initialize state
    state = {
        "messages": messages,
        "last_input": "",
        "intent": "",
        "projects_data": projects_data,
        "personal_info": personal_info,
    }
    
    # Invoke the graph
    result = chat_graph.invoke(state)
    
    return result["messages"]