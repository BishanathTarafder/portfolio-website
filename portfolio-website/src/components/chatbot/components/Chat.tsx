'use client';

import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import TypingIndicator from './TypingIndicator';
import { sendMessage as sendApiMessage, checkApiAvailability, monitorBackendStatus } from '../utils/api';
import { getResponseForMessage } from '../fallback-responses';
import styles from '../ChatWidget.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

interface SuggestionQuestion {
  id: string;
  text: string;
}

interface ChatProps {
  initialMessage?: string;
}

const PREDEFINED_QUESTIONS: SuggestionQuestion[] = [
  { id: 'projects', text: 'Tell me about your projects' },
  { id: 'skills', text: 'What are your technical skills?' },
  { id: 'experience', text: 'Share your work experience' },
  { id: 'contact', text: 'How can I contact you?' },
  { id: 'education', text: 'What\'s your educational background?' },
];

const Chat: React.FC<ChatProps> = ({ initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingMessage, setTypingMessage] = useState('');
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [usesFallback, setUsesFallback] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isApiAvailable, setIsApiAvailable] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Check API availability and monitor status
  useEffect(() => {
    // Initial check
    const checkApi = async () => {
      try {
        const isAvailable = await checkApiAvailability();
        setIsApiAvailable(isAvailable);
        if (!isAvailable) {
          console.error('Backend API not available');
          setUsesFallback(true);
        } else {
          console.log('Backend API available and connected');
          setUsesFallback(false);
        }
      } catch (error) {
        console.error('Error checking API availability:', error);
        setIsApiAvailable(false);
        setUsesFallback(true);
      }
    };
    
    // Perform initial check
    checkApi();
    
    // Set up continuous monitoring (checks every 30 seconds)
    const cleanup = monitorBackendStatus(setIsApiAvailable, 30000);
    
    // Cleanup on unmount
    return cleanup;
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

  // Handle suggestion click
  const handleSuggestionClick = (question: string) => {
    sendMessage(question);
    setShowSuggestions(false);
  };

  // Type message character by character
  const typeMessage = (fullMessage: string, speed = 30) => {
    setIsTyping(true);
    setTypingMessage('');
    let index = 0;
    
    const typeInterval = setInterval(() => {
      setTypingMessage(fullMessage.slice(0, index + 1));
      index++;
      
      if (index >= fullMessage.length) {
        clearInterval(typeInterval);
        setIsTyping(false);
        setTypingMessage('');
      }
    }, speed);
  };

  // Send message to backend API with retry functionality
  const sendMessage = async (content: string, retryAttempt = 0) => {
    if (!content.trim()) return;

    // Hide suggestions after first message
    if (showSuggestions) {
      setShowSuggestions(false);
    }

    // Only add user message on first attempt, not on retries
    if (retryAttempt === 0) {
      const userMessage: Message = { 
        role: 'user', 
        content,
        timestamp: new Date() 
      };
      setMessages((prev) => [...prev, userMessage]);
      
      // Show thinking indicator
      setIsProcessing(true);
    }
    
    // Track if component is still mounted
    let isMounted = true;
    
    try {
      // Call the backend API directly
      const data = await sendApiMessage(content, sessionId);
      
      // Don't update state if component unmounted during API call
      if (!isMounted) return;
      
      // Save session ID for future requests
      if (data.session_id) {
        setSessionId(data.session_id);
      }

      // Hide thinking indicator
      setIsProcessing(false);
      
      // Get response content
      const responseContent = data.response || 'Sorry, I received an empty response. Please try again.';
      
      // Add assistant response to chat with empty content initially
      const timestamp = new Date();
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: '', // Start with empty content
          timestamp
        },
      ]);
      
      // Start typing animation
      typeMessage(responseContent);
      
      // Update the message with full content after animation completes
      setTimeout(() => {
        setMessages((prev) => {
          const updatedMessages = [...prev];
          // Find the last assistant message and update its content
          for (let i = updatedMessages.length - 1; i >= 0; i--) {
            if (updatedMessages[i].role === 'assistant') {
              updatedMessages[i].content = responseContent;
              break;
            }
          }
          return updatedMessages;
        });
      }, responseContent.length * 30 + 100); // Wait for typing to complete plus a small buffer
    } catch (error) {
      // Don't update state if component unmounted during API call
      if (!isMounted) return;
      
      console.error('API Error:', error);
      
      // Determine if it's a timeout error or network error
      const isTimeout = error instanceof Error && error.name === 'AbortError';
      const isNetworkError = error instanceof TypeError;
      
      // Implement automatic retry for timeout and network errors
      if ((isTimeout || isNetworkError) && retryAttempt < 2) {
        console.log(`Attempt ${retryAttempt + 1} failed. Retrying in ${(retryAttempt + 1) * 2} seconds...`);
        
        // Show retry message
        if (isMounted) {
          setMessages((prev) => [
            ...prev,
            { 
              role: 'assistant', 
              content: `The connection ${isTimeout ? 'timed out' : 'failed'}. Retrying automatically in ${(retryAttempt + 1) * 2} seconds...`,
              timestamp: new Date()
            },
          ]);
        }
        
        // Wait before retrying with exponential backoff
        setTimeout(() => {
          if (isMounted) {
            sendMessage(content, retryAttempt + 1);
          }
        }, (retryAttempt + 1) * 2000);
        
        return;
      }
      
      // If we've exhausted retries or it's another type of error, show error message
      const errorMessage = isTimeout
        ? 'The request timed out after multiple attempts. The Gemini API is taking longer than expected to respond. Please try again later.'
        : `Connection error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      
      // Show user-friendly error message
      setMessages((prev) => [
        ...prev,
        { 
          role: 'assistant', 
          content: errorMessage,
          timestamp: new Date()
        },
      ]);
    } finally {
      // Hide typing indicator if component is still mounted
      if (isMounted) {
        setIsProcessing(false);
      }
    }
    
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
            <div className={styles.headerLeft}>
              <div className={styles.assistantAvatar}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={styles.avatarIcon}>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>
                </svg>
              </div>
              <div className={styles.headerInfo}>
                <div className={styles.assistantName}>Portfolio Assistant</div>
                <div className={styles.statusContainer}>
                  <span className={`${styles.statusIndicator} ${isApiAvailable ? styles.online : styles.offline}`}></span>
                  <span className={styles.statusText}>
                    {isTyping ? 'Typing...' : (isApiAvailable ? 'Online' : 'Offline')}
                  </span>
                  {usesFallback && <span className={styles.fallbackBadge}>Fallback Mode</span>}
                </div>
              </div>
            </div>
            <div className={styles.headerControls}>
              <button
                onClick={toggleChat}
                className={styles.closeButton}
                aria-label="Close chat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.closeIcon}
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
          </div>

          {/* Chat messages */}
          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <ChatBubble
                key={index}
                message={{
                  ...message,
                  // If this is the last assistant message and we're typing, show the typing message
                  content: 
                    isTyping && 
                    index === messages.length - 1 && 
                    message.role === 'assistant' 
                      ? typingMessage 
                      : message.content
                }}
                isUser={message.role === 'user'}
              />
            ))}
            {isProcessing && (
              <div className={styles.aiThinkingIndicator}>
                <div className={styles.thinkingAvatar}>
                  <div className={styles.aiIcon}>AI</div>
                </div>
                <div className={styles.thinkingContent}>
                  <div className={styles.thinkingText}>
                    Portfolio Assistant is thinking...
                  </div>
                  <div className={styles.thinkingAnimation}>
                    <span className={styles.thinkingDot}></span>
                    <span className={styles.thinkingDot}></span>
                    <span className={styles.thinkingDot}></span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Predefined questions */}
            {showSuggestions && messages.length === 1 && (
              <div className={styles.suggestionsContainer}>
                <div className={styles.suggestionsTitle}>Try asking:</div>
                <div className={styles.suggestionsList}>
                  {PREDEFINED_QUESTIONS.map((question) => (
                    <button
                      key={question.id}
                      className={styles.suggestionChip}
                      onClick={() => handleSuggestionClick(question.text)}
                    >
                      {question.text}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <ChatInput onSendMessage={sendMessage} isTyping={isTyping} />
        </div>
      )}
    </div>
  );
};

export default Chat;