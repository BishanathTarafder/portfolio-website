/**
 * API utilities for interacting with the chatbot backend
 */

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';

/**
 * Send a message to the chatbot API
 * 
 * @param {string} message - The message to send
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @returns {Promise<Object>} - The response from the API
 */
export const sendMessage = async (message: string, sessionId: string | null = null) => {
  try {
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        session_id: sessionId,
      }),
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
 * @returns {Promise<boolean>} - True if the API is available
 */
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error('Error checking API availability:', error);
    return false;
  }
};