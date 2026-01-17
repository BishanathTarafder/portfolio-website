'use client';

import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import { checkApiAvailability } from './utils/api';

interface ChatbotWidgetProps {
  initialMessage?: string;
}

const ChatbotWidget: React.FC<ChatbotWidgetProps> = ({ 
  initialMessage = "Hello! I'm the portfolio assistant. How can I help you today?" 
}) => {
  // We'll use setApiAvailable but not directly use apiAvailable since Chat handles fallback internally
  const [, setApiAvailable] = useState<boolean | null>(null);
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
      <div className="fixed bottom-4 right-4 flex items-center justify-center gap-1 bg-blue-600 text-white p-3 rounded-full shadow-lg z-50">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.32s]"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.16s]"></div>
        <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
      </div>
    );
  }

  // Always render the Chat component, it will handle fallback mode internally
  return <Chat initialMessage={initialMessage} />;
};

export default ChatbotWidget;