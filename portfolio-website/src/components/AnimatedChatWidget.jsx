import React, { useState, useEffect, useRef } from 'react';
import AnimatedChatToggle from './AnimatedChatToggle';
import AnimatedChatBubble from './AnimatedChatBubble';
import AnimatedChatInput from './AnimatedChatInput';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './AnimatedChat.module.css';
import { checkApiAvailability, processMessage } from '../utils/chatbotApi';

const AnimatedChatWidget = ({ initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [usesFallback, setUsesFallback] = useState(false);
  const messagesEndRef = useRef(null);

  // Check API availability when component mounts
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiAvailability();
      setUsesFallback(!isAvailable);
    };
    
    checkApi();
  }, []);

  // Add initial greeting when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      
      // Process initial greeting through API or fallback
      const sendInitialGreeting = async () => {
        try {
          const response = await processMessage('Hello', null, usesFallback);
          
          if (response.session_id) {
            setSessionId(response.session_id);
          }
          
          setMessages([
            {
              role: 'assistant',
              content: response.message || initialMessage,
              timestamp: new Date(),
            },
          ]);
        } catch (error) {
          console.error('Error sending initial greeting:', error);
          setMessages([
            {
              role: 'assistant',
              content: initialMessage,
              timestamp: new Date(),
            },
          ]);
        } finally {
          setIsTyping(false);
        }
      };
      
      // Add a small delay for better UX
      setTimeout(sendInitialGreeting, 1000);
    }
  }, [isOpen, messages.length, initialMessage, usesFallback]);

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
    const userMessage = { 
      role: 'user', 
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Show typing indicator
    setIsTyping(true);
    
    try {
      // Process message through API or fallback
      const response = await processMessage(content, sessionId, usesFallback);
      
      // Update session ID if provided
      if (response.session_id) {
        setSessionId(response.session_id);
      }
      
      // Add assistant response to chat
      const assistantMessage = {
        role: 'assistant',
        content: response.message || "I'm sorry, I couldn't process your request.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Add error message to chat
      const errorMessage = {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Animation variants for the chat window
  const chatVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        damping: 20, 
        stiffness: 300 
      }
    },
    exit: { 
      opacity: 0, 
      y: 20, 
      scale: 0.95,
      transition: { 
        duration: 0.2 
      }
    }
  };

  return (
    <div className={styles.container}>
      {/* Chat toggle button */}
      <AnimatedChatToggle isOpen={isOpen} onClick={toggleChat} />

      {/* Chat window with animations */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className={styles.chatWindow}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={chatVariants}
          >
            {/* Chat header */}
            <div className={styles.chatHeader}>
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Portfolio Assistant
                {usesFallback && (
                  <span className="ml-2 text-xs bg-yellow-500 text-white px-2 py-0.5 rounded-full">
                    Offline Mode
                  </span>
                )}
              </motion.span>
              <button
                onClick={toggleChat}
                className="text-white hover:text-gray-200 focus:outline-none transition-transform duration-300 hover:rotate-90"
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
              <AnimatePresence>
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <AnimatedChatBubble
                      message={message}
                      isUser={message.role === 'user'}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="self-start"
                  >
                    <div className={styles.typingIndicator}>
                      <div className={styles.typingDot} style={{ animation: 'bounce 1.2s infinite 0.1s' }} />
                      <div className={styles.typingDot} style={{ animation: 'bounce 1.2s infinite 0.3s' }} />
                      <div className={styles.typingDot} style={{ animation: 'bounce 1.2s infinite 0.5s' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Chat input */}
            <AnimatedChatInput onSendMessage={sendMessage} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedChatWidget;