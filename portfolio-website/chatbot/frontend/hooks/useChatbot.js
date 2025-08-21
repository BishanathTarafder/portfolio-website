import { useState, useEffect } from 'react';

const useChatbot = (apiUrl = 'http://localhost:8000/chat') => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [error, setError] = useState(null);

  // Initialize with greeting on first load
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: 'Hello! I\'m the portfolio assistant. How can I help you today?',
        },
      ]);
    }
  }, []);

  // Load session from localStorage on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('chatSessionId');
    const savedMessages = localStorage.getItem('chatMessages');
    
    if (savedSession) {
      setSessionId(savedSession);
    }
    
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error('Error parsing saved messages:', e);
      }
    }
  }, []);

  // Save session to localStorage when it changes
  useEffect(() => {
    if (sessionId) {
      localStorage.setItem('chatSessionId', sessionId);
    }
    
    if (messages.length > 0) {
      localStorage.setItem('chatMessages', JSON.stringify(messages));
    }
  }, [sessionId, messages]);

  const sendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    setError(null);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [userMessage],
          session_id: sessionId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      // Save session ID for future requests
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      // Add assistant response to chat
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.message },
      ]);
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message);
      
      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I\'m having trouble connecting to the server. Please try again later.',
        },
      ]);
    } finally {
      // Hide typing indicator
      setIsTyping(false);
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: 'Hello! I\'m the portfolio assistant. How can I help you today?',
    }]);
    localStorage.removeItem('chatMessages');
  };

  return {
    messages,
    isTyping,
    error,
    sendMessage,
    clearChat,
  };
};

export default useChatbot;