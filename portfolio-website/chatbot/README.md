# Portfolio Chatbot with LangGraph

A chatbot system for portfolio websites using LangGraph for conversation flow management. The chatbot runs with a FastAPI backend and integrates with a Next.js frontend.

## Features

- **LangGraph Integration**: Manages conversation flow and state
- **FastAPI Backend**: Handles chatbot requests and connects with LangGraph
- **Next.js Widget**: Floating chat widget for the portfolio website
- **Tailwind CSS Styling**: Matches the portfolio theme
- **Conversation Memory**: Maintains chat history within sessions

## Project Structure

```
/chatbot
  /backend
    /app
      main.py         # FastAPI application
      graph.py        # LangGraph implementation
      utils.py        # Utility functions
    run.py            # Server startup script
    requirements.txt  # Python dependencies
    .env.example      # Environment variables template
  /frontend
    /components
      Chat.jsx        # Main chat component
      ChatBubble.jsx  # Message bubble component
      ChatInput.jsx   # Message input component
      ChatToggle.jsx  # Chat open/close button
      TypingIndicator.jsx # Loading animation
    /hooks
      useChatbot.js   # Custom React hook for chat state
    /utils
      api.js          # API utilities
    ChatbotWidget.jsx  # Widget entry point
  /data
    projects.json     # Project information
    personal_info.json # Portfolio owner information
  README.md           # Documentation
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd chatbot/backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

6. Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

7. Start the backend server:
   ```bash
   python run.py
   ```

### Frontend Integration

1. Add the chatbot widget to your Next.js portfolio:

   ```jsx
   // In your layout or page component
   import dynamic from 'next/dynamic';
   
   // Import the chatbot widget with client-side rendering only
   const ChatbotWidget = dynamic(
     () => import('../chatbot/frontend/ChatbotWidget'),
     { ssr: false }
   );
   
   export default function Layout({ children }) {
     return (
       <>
         {children}
         <ChatbotWidget />
       </>
     );
   }
   ```

2. Make sure to install the required dependencies:
   ```bash
   npm install react-markdown
   ```

## Customization

### Chatbot Personality

Edit the system prompts in `backend/app/graph.py` to change the chatbot's personality and responses.

### Project Data

Update the `data/projects.json` file with your own project information.

### Personal Information

Update the `data/personal_info.json` file with your personal details, skills, and contact information.

### Styling

The chatbot uses Tailwind CSS classes that can be customized in the frontend components to match your portfolio's theme.

## Deployment

### Backend Deployment

The FastAPI backend can be deployed to platforms like:
- Railway
- Render
- Heroku
- AWS

### Frontend Deployment

The Next.js frontend can be deployed to:
- Vercel
- Netlify
- GitHub Pages

Make sure to update the API URL in the frontend to point to your deployed backend.

## License

MIT