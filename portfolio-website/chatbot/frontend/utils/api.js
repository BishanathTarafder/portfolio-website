/**
 * API utilities for interacting with the chatbot backend
 */

// Try both environment variables for maximum compatibility
const API_URL = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL || '/api';
console.log('Using API URL:', API_URL);

/**
 * Send a message to the chatbot API
 * 
 * @param {string} message - The message to send
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @returns {Promise<Object>} - The response from the API
 */
export const sendMessage = async (message, sessionId = null) => {
  try {
    // Try both environment variables for maximum compatibility
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL || '/api';
    console.log('Sending message to API:', apiUrl);
    
    const response = await fetch(`${apiUrl}/langgraph`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: message,
        session_id: sessionId,
        apiKey: 'AIzaSyDSJItWuJgjWXZ-E7mzWGlCzUojsRZiovQ'
      }),
      // Add timeout to prevent long waiting
      signal: AbortSignal.timeout(10000)
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending message to API:', error);
    throw error;
  }
};

/**
 * Check if the API is available
 * 
 * @returns {Promise<boolean>} - True if the API is available, false otherwise
 */
export const checkApiAvailability = async () => {
  try {
    // Try both environment variables
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_CHATBOT_API_URL || '/api';
    
    console.log('Checking API availability at:', apiUrl);
    
    const response = await fetch(`${apiUrl}/langgraph`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      // Add timeout to prevent long waiting
      signal: AbortSignal.timeout(5000)
    });

    const isAvailable = response.ok;
    console.log('API available:', isAvailable);
    return isAvailable;
  } catch (error) {
    console.error('API availability check failed:', error);
    return false;
  }
};