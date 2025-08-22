from langgraph.graph import StateGraph, END
from typing import Dict, Any, List, Literal, TypedDict, Annotated
import logging
import json
import re

# Define state types for type checking
class ChatState(TypedDict):
    query: str
    context: str
    response: str
    conversation_history: List[Dict[str, str]]
    intent: str

class PortfolioChatbot:
    """
    Portfolio chatbot that uses LangGraph for conversation flow.
    Integrates with LLM and RAG system to provide context-aware responses.
    """
    def __init__(self, llm, rag):
        self.llm = llm
        self.rag = rag
        self.graph = self.create_graph()
        self.system_prompt = """
        You are a professional portfolio assistant for a software engineer.
        Use the provided resume context to answer questions about experience, skills, and projects.
        Be professional, knowledgeable, and helpful. Reference specific details from the resume when relevant.
        
        Resume Context: {context}
        Conversation History: {conversation_history}
        User Query: {query}
        
        Response:
        """
        
        # Load project data if available
        try:
            with open("../data/projects.json", "r") as f:
                self.projects_data = json.load(f)
        except Exception as e:
            logging.warning(f"Could not load projects data: {e}")
            self.projects_data = []
            
        try:
            with open("../data/personal_info.json", "r") as f:
                self.personal_info = json.load(f)
        except Exception as e:
            logging.warning(f"Could not load personal info: {e}")
            self.personal_info = {}
    
    def create_graph(self):
        """
        Create the LangGraph conversation flow with multiple specialized handlers.
        """
        workflow = StateGraph(ChatState)
        
        # Define nodes
        workflow.add_node("classify_intent", self.classify_intent)
        workflow.add_node("get_context", self.get_context)
        workflow.add_node("handle_greeting", self.handle_greeting)
        workflow.add_node("handle_projects", self.handle_projects)
        workflow.add_node("handle_resume", self.handle_resume)
        workflow.add_node("handle_general", self.handle_general)
        
        # Define conditional edges based on intent classification
        workflow.add_conditional_edges(
            "classify_intent",
            self.route_by_intent,
            {
                "greeting": "handle_greeting",
                "projects": "handle_projects",
                "resume": "handle_resume",
                "general": "get_context",
            }
        )
        
        # Connect get_context to handle_general
        workflow.add_edge("get_context", "handle_general")
        
        # All handlers lead to the end
        workflow.add_edge("handle_greeting", END)
        workflow.add_edge("handle_projects", END)
        workflow.add_edge("handle_resume", END)
        workflow.add_edge("handle_general", END)
        
        # Set the entry point
        workflow.set_entry_point("classify_intent")
        
        return workflow.compile()
    
    def classify_intent(self, state: ChatState) -> ChatState:
        """
        Classify the user's intent to route the conversation flow.
        """
        query = state.get("query", "")
        conversation_history = state.get("conversation_history", [])
        
        # Simple rule-based intent classification
        query_lower = query.lower()
        
        # Greeting patterns
        greeting_patterns = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"]
        if any(pattern in query_lower for pattern in greeting_patterns) and len(query_lower.split()) < 5:
            intent = "greeting"
        
        # Project related patterns
        elif any(word in query_lower for word in ["project", "portfolio", "work", "built", "created", "developed"]):
            intent = "projects"
        
        # Resume/experience related patterns
        elif any(word in query_lower for word in ["resume", "experience", "skill", "education", "qualification", "background"]):
            intent = "resume"
        
        # Default to general intent
        else:
            intent = "general"
        
        logging.info(f"Classified intent: {intent} for query: {query}")
        return {**state, "intent": intent}
    
    def route_by_intent(self, state: ChatState) -> Literal["greeting", "projects", "resume", "general"]:
        """
        Route the conversation based on the classified intent.
        """
        return state.get("intent", "general")
    
    def get_context(self, state: ChatState) -> ChatState:
        """
        Retrieve relevant context from the RAG system.
        """
        query = state.get("query", "")
        try:
            context = self.rag.get_context(query)
            return {**state, "context": context}
        except Exception as e:
            logging.error(f"Error retrieving context: {e}")
            return {**state, "context": ""}
    
    def handle_greeting(self, state: ChatState) -> ChatState:
        """
        Handle greeting intents with a friendly response.
        """
        name = self.personal_info.get("name", "the portfolio owner")
        greeting_responses = [
            f"Hello! I'm {name}'s portfolio assistant. How can I help you today?",
            f"Hi there! Welcome to {name}'s portfolio. What would you like to know?",
            f"Greetings! I'm here to tell you about {name}'s work and experience. What are you interested in?"
        ]
        import random
        response = random.choice(greeting_responses)
        return {**state, "response": response}
    
    def handle_projects(self, state: ChatState) -> ChatState:
        """
        Handle project-related queries using project data.
        """
        query = state.get("query", "")
        
        if self.projects_data:
            # Get project context from RAG system
            context = self.rag.get_context(query)
            
            # Format project information
            project_info = "Here are some relevant projects:\n\n"
            for project in self.projects_data[:3]:  # Limit to 3 projects for brevity
                project_info += f"- {project.get('name', 'Unnamed Project')}: {project.get('description', 'No description')}\n"
            
            # Generate response with LLM
            prompt = self.system_prompt.format(
                context=context + "\n" + project_info,
                conversation_history=self._format_conversation_history(state.get("conversation_history", [])),
                query=query
            )
            response = self.llm.generate_response(prompt)
        else:
            # Fallback if no project data is available
            context = self.rag.get_context(query)
            prompt = self.system_prompt.format(
                context=context,
                conversation_history=self._format_conversation_history(state.get("conversation_history", [])),
                query=query
            )
            response = self.llm.generate_response(prompt)
        
        return {**state, "response": response}
    
    def handle_resume(self, state: ChatState) -> ChatState:
        """
        Handle resume-related queries with focused context retrieval.
        """
        query = state.get("query", "")
        context = self.rag.get_context(query)
        
        prompt = self.system_prompt.format(
            context=context,
            conversation_history=self._format_conversation_history(state.get("conversation_history", [])),
            query=query
        )
        response = self.llm.generate_response(prompt)
        
        return {**state, "response": response}
    
    def handle_general(self, state: ChatState) -> ChatState:
        """
        Handle general queries using the LLM and retrieved context.
        """
        query = state.get("query", "")
        context = state.get("context", "")
        
        prompt = self.system_prompt.format(
            context=context,
            conversation_history=self._format_conversation_history(state.get("conversation_history", [])),
            query=query
        )
        response = self.llm.generate_response(prompt)
        
        return {**state, "response": response}
    
    def _format_conversation_history(self, history):
        """
        Format conversation history for inclusion in the prompt.
        """
        if not history:
            return "No previous conversation."
        
        formatted = ""
        for i, message in enumerate(history[-5:]):  # Only include last 5 messages
            role = "User" if message.get("role") == "user" else "Assistant"
            formatted += f"{role}: {message.get('content', '')}\n"
        
        return formatted
    
    def chat(self, message: str, conversation_history=None) -> str:
        """
        Process a user message and return a response.
        
        Args:
            message: The user's message
            conversation_history: Optional conversation history
            
        Returns:
            The chatbot's response
        """
        if conversation_history is None:
            conversation_history = []
            
        try:
            result = self.graph.invoke({
                "query": message,
                "conversation_history": conversation_history,
                "context": "",
                "response": "",
                "intent": ""
            })
            return result["response"]
        except Exception as e:
            logging.error(f"Error in chat flow: {e}")
            return "I'm sorry, I encountered an error while processing your request."