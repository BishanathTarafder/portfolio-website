import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API with the provided API key
const genAI = new GoogleGenerativeAI('AIzaSyDSJItWuJgjWXZ-E7mzWGlCzUojsRZiovQ');

// Configure the model
const modelName = 'gemini-pro';
const model = genAI.getGenerativeModel({ model: modelName });

// Store chat sessions
const chatSessions = new Map();

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { message, session_id } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get or create a chat session
    let chatSession;
    if (session_id && chatSessions.has(session_id)) {
      chatSession = chatSessions.get(session_id);
    } else {
      // Create a new chat session
      chatSession = model.startChat({
        history: [
          {
            role: 'user',
            parts: [{ text: 'Hello, I\'m interested in learning more about your portfolio and skills.' }],
          },
          {
            role: 'model',
            parts: [{ text: 'Hello! I\'m an AI assistant for this portfolio website. I can tell you about the projects, skills, and experience showcased here. What specific information are you looking for?' }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        },
      });
      
      // Generate a new session ID if not provided
      const newSessionId = session_id || Date.now().toString();
      chatSessions.set(newSessionId, chatSession);
      
      // Return the new session ID with the response
      const result = await chatSession.sendMessage(message);
      const response = await result.response;
      const text = response.text();
      
      return new Response(JSON.stringify({ 
        message: text, 
        session_id: newSessionId 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Send message to existing chat session
    const result = await chatSession.sendMessage(message);
    const response = await result.response;
    const text = response.text();
    
    return new Response(JSON.stringify({ 
      message: text, 
      session_id: session_id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in Gemini API:', error);
    return new Response(JSON.stringify({ 
      error: 'Failed to process your request', 
      details: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// Health check endpoint
export async function GET() {
  return new Response(JSON.stringify({ status: 'ok', model: modelName }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}