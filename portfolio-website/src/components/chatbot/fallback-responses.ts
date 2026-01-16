// Fallback responses for when the backend API is not available

interface FallbackResponseCategories {
  greeting: string[];
  about: string[];
  projects: string[];
  skills: string[];
  contact: string[];
  default: string[];
  [key: string]: string[];
}

const fallbackResponses: FallbackResponseCategories = {
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
function getRandomResponse(category: string): string {
  const responses = fallbackResponses[category] || fallbackResponses.default;
  const randomIndex = Math.floor(Math.random() * responses.length);
  return responses[randomIndex];
}

/**
 * Get a fallback response based on the message content
 * 
 * @param {string} message - The user's message
 * @returns {string} - A relevant fallback response
 */
export function getResponseForMessage(message: string): string {
  const lowerMessage = message.toLowerCase();
  
  // Check for greeting patterns
  if (
    lowerMessage.includes('hello') ||
    lowerMessage.includes('hi') ||
    lowerMessage.includes('hey') ||
    lowerMessage.match(/^(good|morning|afternoon|evening)/) ||
    lowerMessage.includes('welcome')
  ) {
    return getRandomResponse('greeting');
  }
  
  // Check for about patterns
  if (
    lowerMessage.includes('about you') ||
    lowerMessage.includes('about yourself') ||
    lowerMessage.includes('who are you') ||
    lowerMessage.includes('tell me about') ||
    lowerMessage.includes('background')
  ) {
    return getRandomResponse('about');
  }
  
  // Check for projects patterns
  if (
    lowerMessage.includes('project') ||
    lowerMessage.includes('portfolio') ||
    lowerMessage.includes('work') ||
    lowerMessage.includes('built') ||
    lowerMessage.includes('created')
  ) {
    return getRandomResponse('projects');
  }
  
  // Check for skills patterns
  if (
    lowerMessage.includes('skill') ||
    lowerMessage.includes('technology') ||
    lowerMessage.includes('tech stack') ||
    lowerMessage.includes('framework') ||
    lowerMessage.includes('language') ||
    lowerMessage.includes('programming') ||
    lowerMessage.includes('experience with')
  ) {
    return getRandomResponse('skills');
  }
  
  // Check for contact patterns
  if (
    lowerMessage.includes('contact') ||
    lowerMessage.includes('email') ||
    lowerMessage.includes('reach') ||
    lowerMessage.includes('connect') ||
    lowerMessage.includes('linkedin') ||
    lowerMessage.includes('social')
  ) {
    return getRandomResponse('contact');
  }
  
  // Default response if no patterns match
  return getRandomResponse('default');
}