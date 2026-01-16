# Chatbot Integration Guide

This guide explains how to integrate the LangGraph chatbot into your existing portfolio website.

## Prerequisites

- Node.js and npm installed
- Python 3.8+ installed
- An OpenAI API key

## Step 1: Backend Setup

1. Start the FastAPI backend server:

   ```bash
   cd chatbot/backend
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   # source venv/bin/activate
   pip install -r requirements.txt
   python run.py
   ```

2. Verify the server is running by visiting `http://localhost:8000` in your browser. You should see a JSON response: `{"message":"Portfolio Chatbot API is running"}`

## Step 2: Frontend Integration

### Option 1: Next.js Integration

If your portfolio is built with Next.js:

1. Copy the `chatbot/frontend` directory to your project.

2. Install required dependencies:

   ```bash
   npm install react-markdown
   ```

3. Import the chatbot widget in your layout or page component:

   ```jsx
   // In your _app.js or layout component
   import dynamic from 'next/dynamic';
   
   // Import with client-side rendering only
   const ChatbotWidget = dynamic(
     () => import('../path/to/chatbot/frontend/ChatbotWidget'),
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

### Option 2: React Integration

If your portfolio is built with React:

1. Copy the `chatbot/frontend` directory to your project.

2. Install required dependencies:

   ```bash
   npm install react-markdown
   ```

3. Import the chatbot widget in your main App component:

   ```jsx
   import React from 'react';
   import ChatbotWidget from './path/to/chatbot/frontend/ChatbotWidget';
   
   function App() {
     return (
       <div className="App">
         {/* Your existing app content */}
         <ChatbotWidget />
       </div>
     );
   }
   
   export default App;
   ```

### Option 3: HTML/JavaScript Integration

If your portfolio is a simple HTML website:

1. Create a simplified version of the chatbot using vanilla JavaScript or a small React bundle.

2. Add the following to your HTML:

   ```html
   <!-- In the head section -->
   <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
   
   <!-- At the end of the body -->
   <div id="chatbot-container"></div>
   <script src="path/to/chatbot-bundle.js"></script>
   ```

## Step 3: Configure API Endpoint

1. Create a `.env.local` file in your frontend project root:

   ```
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

2. For production, update this to your deployed backend URL.

## Step 4: Customize Appearance

1. Edit the Tailwind CSS classes in the frontend components to match your portfolio's color scheme.

2. The main styling components are in:
   - `Chat.jsx` - Overall container
   - `ChatBubble.jsx` - Message bubbles
   - `ChatToggle.jsx` - Chat button

## Step 5: Deploy

1. Deploy the backend to a service like Railway, Render, or Heroku.

2. Update the API URL in your frontend to point to the deployed backend.

3. Deploy your frontend as usual.

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, make sure the backend's `ALLOWED_ORIGINS` in `.env` includes your frontend URL.

- **API Connection Errors**: Check that the backend is running and accessible from your frontend.

- **Styling Issues**: If the Tailwind styles aren't applying correctly, make sure Tailwind is properly configured in your project.

## Advanced Configuration

### Custom Prompts

To customize the chatbot's personality, edit the system prompts in `backend/app/graph.py`.

### Session Management

The chatbot uses browser localStorage for session persistence. For more robust session management, consider implementing a database backend.