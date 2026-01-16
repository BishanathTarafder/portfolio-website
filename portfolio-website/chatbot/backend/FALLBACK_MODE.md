# Chatbot Fallback Mode

## Overview

The fallback mode provides a way for the chat widget to continue functioning even when the backend server is unavailable. This document outlines how to implement a client-side fallback mechanism for basic chatbot functionality.

## Implementation

### 1. Modify the Chat Widget to Include Fallback Logic

Update your `ChatWidget.tsx` component to include fallback handling:

```tsx
// Add to imports
import { useState, useEffect, useRef, useCallback } from 'react';

// Add these types
type Message = {
  content: string;
  isUser: boolean;
  timestamp: Date;
};

type FallbackResponse = {
  greeting: string[];
  projects: string[];
  experience: string[];
  skills: string[];
  contact: string[];
  unknown: string[];
};

const ChatWidget = () => {
  // Existing state variables...
  const [usesFallback, setUsesFallback] = useState(false);
  
  // Fallback responses
  const fallbackResponses: FallbackResponse = {
    greeting: [
      "Hello! I'm a portfolio assistant. I can tell you about projects, skills, and experience.",
      "Hi there! How can I help you today? Feel free to ask about projects or experience.",
      "Welcome! I'm here to help you learn more about this portfolio."
    ],
    projects: [
      "This portfolio includes several key projects. You can find detailed information about each project in the Projects section of the website.",
      "The portfolio showcases various projects demonstrating skills in web development, data analysis, and more.",
      "Projects in this portfolio demonstrate expertise in technologies like React, Node.js, and Python."
    ],
    experience: [
      "The portfolio owner has experience in full-stack development, with expertise in modern web technologies.",
      "Professional experience includes work in software development, focusing on web applications and data systems.",
      "The resume section provides detailed information about work history and professional achievements."
    ],
    skills: [
      "Key skills include JavaScript, TypeScript, React, Node.js, Python, and database technologies.",
      "Technical expertise spans frontend development, backend systems, and cloud infrastructure.",
      "The skill set combines programming proficiency with project management and problem-solving abilities."
    ],
    contact: [
      "You can reach out through the contact form on this website or via the provided social media links.",
      "Feel free to connect through LinkedIn or GitHub using the links in the contact section.",
      "The best way to get in touch is through email or the contact form on this site."
    ],
    unknown: [
      "I'm sorry, I don't have enough information to answer that question in fallback mode.",
      "That's beyond what I can answer in offline mode. Please try again when the server is online.",
      "I'm currently operating in limited mode and can't provide a detailed answer to that question."
    ]
  };

  // Check server availability on mount
  useEffect(() => {
    const checkServerAvailability = async () => {
      try {
        const response = await fetch('http://localhost:8000/health', { 
          signal: AbortSignal.timeout(3000) // 3 second timeout
        });
        setUsesFallback(!response.ok);
      } catch (error) {
        console.log('Using fallback mode due to server unavailability');
        setUsesFallback(true);
      }
    };
    
    checkServerAvailability();
  }, []);

  // Get a random response from the fallback categories
  const getFallbackResponse = useCallback((message: string) => {
    const lowerMessage = message.toLowerCase();
    let category: keyof FallbackResponse = 'unknown';
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      category = 'greeting';
    } else if (lowerMessage.includes('project')) {
      category = 'projects';
    } else if (lowerMessage.includes('experience') || lowerMessage.includes('work') || lowerMessage.includes('job')) {
      category = 'experience';
    } else if (lowerMessage.includes('skill') || lowerMessage.includes('know') || lowerMessage.includes('tech')) {
      category = 'skills';
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('reach')) {
      category = 'contact';
    }
    
    const responses = fallbackResponses[category];
    return responses[Math.floor(Math.random() * responses.length)];
  }, [fallbackResponses]);

  // Modified handleSendMessage function
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Add user message to chat
    const userMessage: Message = {
      content: message,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);

    // Short delay to simulate processing
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      if (usesFallback) {
        // Use fallback mode
        const fallbackResponse = getFallbackResponse(userMessage.content);
        const botMessage: Message = {
          content: fallbackResponse + (usesFallback ? ' (Fallback Mode)' : ''),
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Try to use the server
        const response = await fetch('http://localhost:8000/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage.content,
            session_id: sessionId,
          }),
          signal: AbortSignal.timeout(5000) // 5 second timeout
        });

        if (!response.ok) {
          throw new Error('Failed to get response');
        }

        const data = await response.json();

        // Add bot response to chat
        const botMessage: Message = {
          content: data.response,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      // Switch to fallback mode if server fails
      if (!usesFallback) {
        setUsesFallback(true);
        const fallbackResponse = getFallbackResponse(userMessage.content);
        const botMessage: Message = {
          content: `I've switched to offline mode due to connection issues. ${fallbackResponse} (Fallback Mode)`,
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Already in fallback mode, show error
        const errorMessage: Message = {
          content: 'Sorry, I encountered an error. Please try again later.',
          isUser: false,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Rest of the component remains the same...
};
```

### 2. Add Visual Indicator for Fallback Mode

Update the chat header to show when fallback mode is active:

```tsx
<div className={styles.chatHeader}>
  <h3>
    Portfolio Assistant
    {usesFallback && <span className={styles.fallbackBadge}>Offline Mode</span>}
  </h3>
</div>
```

Add the corresponding CSS:

```css
/* Add to ChatWidget.module.css */
.fallbackBadge {
  font-size: 10px;
  background-color: #ff9800;
  color: white;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 8px;
  vertical-align: middle;
}
```

## Benefits of Fallback Mode

1. **Continuous Availability**: The chat widget remains functional even when the backend is down or unreachable.
2. **Reduced Dependency**: Basic interactions don't require a server connection.
3. **Better User Experience**: Users receive immediate responses rather than error messages.
4. **Graceful Degradation**: The system automatically switches between full and limited functionality.

## Limitations

1. **Limited Response Variety**: Fallback mode uses a predefined set of responses.
2. **No Personalization**: Cannot provide user-specific or context-aware responses.
3. **Simplified Logic**: Cannot handle complex queries or multi-turn conversations effectively.
4. **No Data Access**: Cannot access or search through detailed project information.

## Testing Fallback Mode

To test the fallback mode:

1. Stop the backend server
2. Refresh your Next.js application
3. Open the chat widget
4. Send messages to see the fallback responses
5. Restart the backend server and refresh to test automatic switching back to server mode

## Future Improvements

- **Enhanced Fallback Logic**: Implement more sophisticated pattern matching for better response selection
- **Cached Data**: Store basic portfolio data in localStorage for richer offline responses
- **Periodic Reconnection Attempts**: Automatically try to reconnect to the backend periodically
- **Sync Messages**: Queue messages sent during offline mode to be processed when back online