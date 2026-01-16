/**
 * Chatbot API utilities for connecting to the backend
 */

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

/**
 * Send a message to the chatbot API
 * 
 * @param {string} message - The message to send
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @returns {Promise<Object>} - The response from the API
 */
export const sendMessage = async (message, sessionId = null) => {
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
export const checkApiAvailability = async () => {
  try {
    const response = await fetch(`${API_URL}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('API availability check failed:', error);
    return false;
  }
};

// Fallback responses for when the backend API is not available
const fallbackResponses = {
  // Greeting patterns
  greeting: [
    "Hello! I'm your portfolio assistant. How can I help you today?",
    "Hi there! I'm here to help you learn more about this portfolio. What would you like to know?",
    "Welcome! I can tell you about projects, skills, and experience. What are you interested in?"
  ],
  
  // About me patterns
  about: [
    "I'm a software engineer with expertise in web development, focusing on modern JavaScript frameworks and cloud technologies.",
    "I specialize in building responsive web applications using React, Next.js, and Node.js with a focus on performance and user experience.",
    "I have experience in full-stack development with a passion for creating clean, maintainable code and intuitive user interfaces."
  ],
  
  // Projects patterns
  projects: [
    "I've worked on several projects including this portfolio website, e-commerce platforms, data visualization dashboards, and mobile applications.",
    "My recent projects include web applications built with React and Next.js, backend systems using Node.js and Express, and cloud deployments on AWS and Vercel.",
    "You can find details about my projects in the Projects section of this portfolio. Each project includes technologies used and key features implemented."
  ],
  
  // Skills patterns
  skills: [
    "My technical skills include JavaScript (React, Node.js), TypeScript, HTML/CSS, Python, SQL, Git, and cloud platforms like AWS and Vercel.",
    "I'm proficient in frontend frameworks like React and Next.js, backend technologies like Express and FastAPI, and database systems including MongoDB and PostgreSQL.",
    "My skill set covers the full development stack from UI/UX design to backend architecture and deployment automation."
  ],
  
  // Contact patterns
  contact: [
    "You can reach me via email or connect with me on LinkedIn. Check the Contact section for details.",
    "Feel free to send me an email or message me on LinkedIn. My contact information is available in the Contact section below.",
    "The best way to contact me is through email or LinkedIn. You'll find my contact details at the bottom of this page."
  ],
  
  // Default fallback responses
  default: [
    "I'm sorry, I don't have that information available offline. Please check the portfolio sections for more details.",
    "That's a great question! You can find more information about that in the relevant sections of my portfolio.",
    "I'd be happy to help with that when my backend is connected. For now, please explore the portfolio sections for more information."
  ]
};

// Function to get a random response from a category
function getRandomResponse(category) {
  const responses = fallbackResponses[category] || fallbackResponses.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

// Function to determine the category of a message
function getCategoryFromMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting patterns
  if (/\b(hi|hello|hey|greetings|howdy)\b/.test(lowerMessage)) {
    return 'greeting';
  }
  
  // Check for about me patterns
  if (/\b(about|who are you|tell me about you|your background|experience|bio)\b/.test(lowerMessage)) {
    return 'about';
  }
  
  // Check for projects patterns
  if (/\b(project|portfolio|work|app|application|website|developed|built)\b/.test(lowerMessage)) {
    return 'projects';
  }
  
  // Check for skills patterns
  if (/\b(skill|technology|tech stack|framework|language|tool|proficient|expertise)\b/.test(lowerMessage)) {
    return 'skills';
  }
  
  // Check for contact patterns
  if (/\b(contact|email|phone|reach|message|connect|linkedin|github)\b/.test(lowerMessage)) {
    return 'contact';
  }
  
  // Default category
  return 'default';
}

// Main function to get a response for a message
export function getResponseForMessage(message) {
  const category = getCategoryFromMessage(message);
  return getRandomResponse(category);
}

/**
 * Process a message with API or fallback
 * 
 * @param {string} message - The message to process
 * @param {string|null} sessionId - Optional session ID for continuing a conversation
 * @param {boolean} usesFallback - Whether to use fallback mode
 * @returns {Promise<Object>} - The response object
 */
export const processMessage = async (message, sessionId = null, usesFallback = false) => {
  if (usesFallback) {
    // Use fallback mode
    const fallbackResponse = getResponseForMessage(message);
    return {
      message: fallbackResponse,
      session_id: sessionId || 'fallback-session',
    };
  }
  
  try {
    // Try to use the API
    return await sendMessage(message, sessionId);
  } catch (error) {
    console.error('Error processing message, falling back to local responses:', error);
    // Fall back to local responses if API fails
    const fallbackResponse = getResponseForMessage(message);
    return {
      message: fallbackResponse,
      session_id: sessionId || 'fallback-session',
    };
  }
};