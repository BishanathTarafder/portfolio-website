/**
 * API utilities for interacting with the chatbot backend
 */

const API_URL = process.env.NEXT_PUBLIC_CHATBOT_API_URL || 'http://localhost:8000';
const API_TIMEOUT = 60000; // 60 seconds timeout

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
    console.log('Sending message to API:', message);
    
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.log(`Request timeout after ${API_TIMEOUT/1000} seconds, aborting...`);
      controller.abort();
    }, API_TIMEOUT);
    
    const response = await fetch(`${API_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        message: message,
        session_id: sessionId 
      }),
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const data = await response.json();
    console.log('API response:', data);
    
    // Transform the response to match what the Chat component expects
    return {
      response: data.response || data.message || 'No response received',
      session_id: data.session_id
    };
  } catch (error: unknown) {
    console.error('Error sending message to API:', error);
    
    // Enhanced retry logic for network errors and timeouts (max 2 retries)
    if (retryCount < 2) {
      // Check if it's a timeout or network error
      const isTimeout = (error as any)?.name === 'AbortError';
      const isNetworkError = error instanceof TypeError;
      
      if (isTimeout || isNetworkError) {
        // Exponential backoff: wait longer for each retry attempt
        const backoffTime = 2000 * Math.pow(2, retryCount); // 2s, then 4s
        console.log(`${isTimeout ? 'Timeout' : 'Network error'} detected. Retrying API call (${retryCount + 1}/2) after ${backoffTime/1000}s delay...`);
        
        // Wait before retrying
        await new Promise(resolve => setTimeout(resolve, backoffTime));
        return sendMessage(message, sessionId, retryCount + 1);
      }
    }
    
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
    // Create an abort controller for timeout handling
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout for API check
    
    // Use the local health endpoint if API_URL is localhost
    const healthUrl = API_URL.includes('localhost') 
      ? '/api/health' 
      : `${API_URL}/health`;
    
    const response = await fetch(healthUrl, {
      method: 'GET',
      signal: controller.signal
    });
    
    // Clear the timeout
    clearTimeout(timeoutId);
    
    console.log('API health check response:', response.status, response.statusText);
    return response.ok;
  } catch (error) {
    console.error('Error checking API availability:', error);
    return false;
  }
};

/**
 * Check backend status periodically
 * 
 * @param {Function} setIsOnline - State setter function for online status
 * @param {number} interval - Check interval in milliseconds
 * @returns {Function} - Cleanup function to clear interval
 */
export const monitorBackendStatus = (setIsOnline: (status: boolean) => void, interval = 30000): () => void => {
  const checkBackendStatus = async () => {
    try {
      const isAvailable = await checkApiAvailability();
      setIsOnline(isAvailable);
    } catch (error) {
      console.error('Backend connection check failed:', error);
      setIsOnline(false);
    }
  };
  
  // Initial check
  checkBackendStatus();
  
  // Set up interval for periodic checks
  const intervalId = setInterval(checkBackendStatus, interval);
  
  // Return cleanup function
  return () => clearInterval(intervalId);
};