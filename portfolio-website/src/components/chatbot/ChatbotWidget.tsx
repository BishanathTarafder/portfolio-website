'use client';

import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import { checkApiAvailability } from './utils/api';
import styles from './ChatWidget.module.css';

interface ChatbotWidgetProps {
  initialMessage?: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ 
  initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" 
}) => {
  const [apiAvailable, setApiAvailable] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if the API is available on component mount
  useEffect(() => {
    const checkApi = async () => {
      try {
        const isAvailable = await checkApiAvailability();
        setApiAvailable(isAvailable);
      } catch (error) {
        console.error('Error checking API availability:', error);
        setApiAvailable(false);
      } finally {
        setLoading(false);
      }
    };

    checkApi();
  }, []);

  // Show loading state while checking API
  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingDot}></div>
        <div className={styles.loadingDot}></div>
        <div className={styles.loadingDot}></div>
      </div>
    );
  }

  // Always render the Chat component, it will handle fallback mode internally
  return <Chat initialMessage={initialMessage} />;
};

export default ChatbotWidget;