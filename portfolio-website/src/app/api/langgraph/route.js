import { createLangGraphWorkflow, getOrCreateWorkflowSession, updateWorkflowSession } from './workflow';

// Handle POST requests to the LangGraph endpoint
export async function POST(request) {
  try {
    // Check for API key in headers
    const apiKey = request.headers.get('x-api-key');
    
    // Parse the request body
    const body = await request.json();
    const { message, session_id } = body;
    
    if (!message) {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Get or create a workflow session
    const { workflow, history, sessionId } = getOrCreateWorkflowSession(session_id, apiKey);
    
    // Invoke the workflow with the message and history
    const response = await workflow.invoke({
      message,
      history
    });
    
    // Update the session with the new message and response
    updateWorkflowSession(sessionId, message, response);
    
    // Return the response
    return new Response(JSON.stringify({ 
      message: response, 
      session_id: sessionId 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
  } catch (error) {
    console.error('Error in LangGraph API:', error);
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
export async function GET(request) {
  try {
    // Check for API key in headers
    const apiKey = request.headers.get('x-api-key');
    
    // Create a test workflow to verify it's working
    const workflow = createLangGraphWorkflow(apiKey);
    await workflow.invoke({
      message: 'test',
      history: []
    });
    
    return new Response(JSON.stringify({ 
      status: 'ok', 
      model: 'gemini-pro',
      implementation: 'langgraph'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in LangGraph health check:', error);
    return new Response(JSON.stringify({ 
      status: 'error', 
      error: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}