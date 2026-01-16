import { NextResponse } from 'next/server';

/**
 * Health check endpoint for the chatbot API
 * Used to verify if the backend is online
 */
export async function GET() {
  return NextResponse.json(
    { status: 'ok', timestamp: new Date().toISOString() },
    { status: 200 }
  );
}