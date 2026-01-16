import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import TypingIndicator from './TypingIndicator';
import { sendMessage as sendApiMessage, checkApiAvailability } from '../utils/api';
import { getResponseForMessage } from '../fallback-responses';
import styles from '../ChatWidget.module.css';

const Chat = ({ initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [usesFallback, setUsesFallback] = useState(false);
  const messagesEndRef = useRef(null);

  // Check API availability and set fallback mode
  useEffect(() => {
    let retryCount = 0;
    const maxRetries = 5; // Increased max retries
    const retryInterval = 3000; // 3 seconds between retries

    const checkApi = async () => {
      try {
        const isAvailable = await checkApiAvailability();
        setUsesFallback(false); // Force API mode to be enabled
        console.log('LangGraph API available:', isAvailable);
        // Reset retry count on success
        retryCount = 0;
      } catch (error) {
        console.error('Error checking LangGraph API availability:', error);
        if (retryCount < maxRetries) {
          retryCount++;
          console.log(`Retrying LangGraph API check (${retryCount}/${maxRetries})...`);
          setTimeout(checkApi, retryInterval);
        } else {
          console.log('Max retries reached, but still using API mode');
          setUsesFallback(false); // Force API mode even if check fails
        }
      }
    };
    
    // Initial check
    checkApi();
    
    // Set up interval to periodically check API availability
    const intervalId = setInterval(checkApi, 15000); // Check every 15 seconds
    
    return () => clearInterval(intervalId); // Clean up on unmount
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
  const sendMessage = async (content) => {
    if (!content.trim()) return;

    // Add user message to chat
    const userMessage = { role: 'user', content };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate typing delay for better UX
    const typingDelay = usesFallback ? 500 : 0;
    
    setTimeout(async () => {
      try {
        // Always try to use the API
        const data = await sendApiMessage(content, sessionId);
        
        // Save session ID for future requests
        if (data.session_id) {
          setSessionId(data.session_id);
        }

        // Add assistant response to chat
        if (data.response || data.message) {
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: data.response || data.message },
          ]);
          console.log('LangGraph API responded successfully');
        } else if (data.error) {
          console.error('LangGraph API returned error:', data.error);
          throw new Error(data.error);
        } else {
          console.error('Unexpected LangGraph API response format:', data);
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error sending message:', error);
        
        // Add error message to chat
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: 'I encountered an error processing your request. Please try again in a moment.' },
        ]);
        
        // Try again with the API on next message
        console.log('Will retry with API on next message');
      } finally {
        // Hide typing indicator
        setIsTyping(false);
      }
    }, typingDelay);
  };

  return (
    <div className={styles.container}>
      {/* Always show as online */}
      {/* Chat toggle button - always show as online */}
      <ChatToggle isOpen={isOpen} onClick={toggleChat} usesFallback={false} />

      {/* Chat window */}
      {isOpen && (
        <div className={`${styles.chatWindow} ${styles.fadeIn}`}>
          {/* Chat header */}
          <div className={styles.chatHeader}>
            <span>
              Portfolio Assistant
              {usesFallback ? (
                <span className={styles.fallbackBadge}>
                  Offline Mode
                </span>
              ) : (
                <span className={styles.onlineBadge}>
                  ONLINE
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