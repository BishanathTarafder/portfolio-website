'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import TypingIndicator from './TypingIndicator';
import { sendMessage as sendApiMessage, checkApiAvailability } from '../utils/api';
import { getResponseForMessage } from '../fallback-responses';
import styles from '../ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatProps {
  initialMessage?: string;
}

const Chat: React.FC<ChatProps> = ({ initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [usesFallback, setUsesFallback] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check API availability and set fallback mode
  useEffect(() => {
    const checkApi = async () => {
      try {
        const isAvailable = await checkApiAvailability();
        setUsesFallback(!isAvailable);
        
        if (!isAvailable) {
          console.log('API not available, using fallback mode');
        }
      } catch (error) {
        console.error('Error checking API availability:', error);
        setUsesFallback(true); // Default to fallback mode on error
      }
    };
    
    checkApi();
  }, []);
  
  // Add initial greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: initialMessage,
        },
      ]);
    }
  }, [isOpen, messages.length, initialMessage]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Send message to backend API or use fallback
  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage: Message = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate typing delay for better UX
    const typingDelay = usesFallback ? 500 : 0;
    
    // Track if component is still mounted
    let isMounted = true;
    
    setTimeout(async () => {
      // Don't proceed if component unmounted during the delay
      if (!isMounted) return;
      
      try {
        if (usesFallback) {
          // Use fallback mode with predefined responses
          const fallbackResponse = getResponseForMessage(content);
          
          // Add fallback response to chat
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: fallbackResponse },
          ]);
        } else {
          // Try to use the API with a timeout
          const data = await sendApiMessage(content, sessionId);
          
          // Don't update state if component unmounted during API call
          if (!isMounted) return;
          
          // Save session ID for future requests
          if (data.session_id) {
            setSessionId(data.session_id);
          }

          // Add assistant response to chat
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.message || 'Sorry, I received an empty response. Please try again.' },
          ]);
        }
      } catch (error) {
        // Don't update state if component unmounted during API call
        if (!isMounted) return;
        
        console.error('Error sending message:', error);
        
        // Switch to fallback mode if API fails
        setUsesFallback(true);
        
        // Add error message to chat
        setMessages((prev) => [
          ...prev,
          { 
            role: 'assistant', 
            content: 'Sorry, I encountered an error connecting to my knowledge base. I\'ll switch to offline mode for now.' 
          },
        ]);
        
        // Try to get a fallback response after showing the error
        setTimeout(() => {
          if (isMounted) {
            const fallbackResponse = getResponseForMessage(content);
            setMessages((prev) => [
              ...prev,
              { role: 'assistant', content: fallbackResponse },
            ]);
          }
        }, 1000);
      } finally {
        // Hide typing indicator if component is still mounted
        if (isMounted) {
          setIsTyping(false);
        }
      }
    }, typingDelay);
    
    // Cleanup function to prevent state updates if component unmounts
    return () => {
      isMounted = false;
    };
  };

  return (
    <div className={`${styles.container} ${isOpen ? styles.mobileFullscreen : ''}`}>
      {/* Chat toggle button */}
      <ChatToggle isOpen={isOpen} onClick={toggleChat} />

      {/* Chat window */}
      {isOpen && (
        <div className={`${styles.chatWindow} ${styles.fadeIn}`}>
          {/* Chat header */}
          <div className={styles.chatHeader}>
            <span>
              Portfolio Assistant
              {usesFallback && (
                <span className={styles.fallbackBadge}>
                  Offline Mode
                </span>
              )}
            </span>
            <button
              onClick={toggleChat}
              className="text-white hover:text-gray-200 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Chat messages */}
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={message}
                isUser={message.role === 'user'}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <ChatInput onSendMessage={sendMessage} />
        </div>
      )}
    </div>
  );
};

export default Chat;