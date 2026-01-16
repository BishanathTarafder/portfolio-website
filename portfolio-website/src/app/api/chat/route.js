import { NextResponse } from 'next/server';

// Handle POST requests to the chat endpoint
export async function POST(request) {
  if (request.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  try {
    console.log('Calling backend at http://localhost:8000/chat');
    
    // Parse the request body
    const body = await request.json();
    
    const backendResponse = await fetch('http://localhost:8000/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message
      })
    });

    if (!backendResponse.ok) {
      throw new Error(`Backend returned ${backendResponse.status}`);
    }

    const data = await backendResponse.json();
    console.log('Backend response:', data);
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json({ 
      error: 'Failed to process your request', 
      details: error.message 
    }, { status: 500 });
  }
}

// Health check endpoint
export async function GET() {
  try {
    // Return a simple health check response
    return NextResponse.json({ 
      status: 'ok',
      implementation: 'nextjs-api-route'
    });
  } catch (error) {
    console.error('Error in chat health check:', error);
    return NextResponse.json({ 
      status: 'error', 
      error: error.message 
    }, { status: 500 });
  }
}