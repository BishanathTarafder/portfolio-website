# Portfolio Website Chatbot Backend

## Overview

This is the backend component of the portfolio website chatbot. It provides a conversational AI interface that can answer questions about the portfolio owner's projects, experience, and skills. The backend is built with FastAPI and uses LangGraph for conversation flow management.

## Features

- **Intent-based Conversation Flow**: Classifies user queries into different intents (greeting, projects, resume, general) and routes them to specialized handlers.
- **Context-aware Responses**: Maintains conversation history to provide contextually relevant responses.
- **Project Information**: Provides detailed information about portfolio projects from a structured JSON data source.
- **Resume Information**: Shares professional experience, skills, and education from a structured JSON data source.

## Architecture

The backend consists of several key components:

1. **FastAPI Application** (`main.py`): Handles HTTP requests, manages sessions, and serves as the entry point.
2. **LLM Manager** (`llm_manager.py`): Manages interactions with the language model.
3. **RAG System** (`rag_system.py`): Implements retrieval-augmented generation for providing context-aware responses.
4. **Chatbot** (`chatbot.py`): Implements the conversation flow using LangGraph, with specialized handlers for different types of queries.
5. **Data Files** (`data/projects.json`, `data/personal_info.json`): Structured data about projects and personal information.

## Setup

### Prerequisites

- Python 3.8+
- Required packages (see `requirements.txt`)

### Installation

1. Clone the repository
2. Navigate to the backend directory
3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

### Running the Server

```
python -m uvicorn app.main:app --reload
```

The server will start on `http://localhost:8000`.

## API Endpoints

### `/chat`

- **Method**: POST
- **Description**: Process a chat message and return a response
- **Request Body**:
  ```json
  {
    "message": "Tell me about your projects",
    "session_id": "unique-session-id"
  }
  ```
- **Response**:
  ```json
  {
    "response": "Here are some projects I've worked on..."
  }
  ```

### `/health`

- **Method**: GET
- **Description**: Check if the API is running
- **Response**: Status 200 OK

## Testing

Run the test script to verify the functionality:

```
python test_chatbot.py
```

This will test both the API endpoints (if the server is running) and the direct component functionality.

## Integration with Frontend

The frontend can communicate with this backend via HTTP requests to the `/chat` endpoint. See `INTEGRATION.md` for more details on integrating with the Next.js frontend.