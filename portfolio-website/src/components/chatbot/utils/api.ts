/**
 * API utilities for interacting with the chatbot backend
 */

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 10000; // 10 seconds timeout

/**
 * Send a message to the chatbot API
 * 
 * @param {string} message - The message to send
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @returns {Promise<Object>} - The response from the API
 */
/**
 * Send a message to the chatbot API with timeout and retry functionality
 * 
 * @param {string} message - The message to send
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @param {number} retryCount - Number of retries attempted (internal use)
 * @returns {Promise<Object>} - The response from the API
 */
export const sendMessage = async (message: string, sessionId: string | null = null, retryCount = 0): Promise<any> => {
  try {
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);
    
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [{ role: 'user', content: message }],
        session_id: sessionId,
      }),
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`API error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error: unknown) {
    console.error('Error sending message to API:', error);
    
    // Retry logic for network errors (max 2 retries)
    if (retryCount < 2 && (error instanceof TypeError || (error as any)?.name === 'AbortError')) {
      console.log(`Retrying API call (${retryCount + 1}/2)...`);
      return sendMessage(message, sessionId, retryCount + 1);
    }
    
    throw error;
  }
};

/**
 * Check if the API is available
 * 
 * @returns {Promise<boolean>} - True if the API is available
 */
/**
 * Check if the API is available with timeout handling
 * 
 * @returns {Promise<boolean>} - True if the API is available
 */
export const checkApiAvailability = async (): Promise<boolean> => {
  try {
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for health check
    
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    return response.ok;
  } catch (error) {
    console.error('Error checking API availability:', error);
    return false;
  }
};