import React, { useState, useEffect } from 'react';
import Chat from './components/Chat';
import { checkApiAvailability } from './utils/api';

const ChatbotWidget = () => {
  const [apiAvailable, setApiAvailable] = useState(true);

  // Check if the API is available on component mount
  useEffect(() => {
    const checkApi = async () => {
      const isAvailable = await checkApiAvailability();
      setApiAvailable(isAvailable);
    };

    checkApi();
  }, []);

  // Don't render the chat widget if the API is not available
  if (!apiAvailable) {
    return null;
  }

  return <Chat />;
};

export default ChatbotWidget;