import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import SuggestionGrid from './SuggestionGrid';
import { sendMessage, monitorBackendStatus } from '../utils/api';
import { getResponseForMessage } from '../fallback-responses';
import { IconMinus } from './icons';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

const Chat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [sessionId, setSessionId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Monitor backend status
  useEffect(() => {
    const cleanup = monitorBackendStatus(setIsOnline);
    return cleanup;
  }, []);

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMsg: Message = { role: 'user', content, id: Date.now().toString() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      let responseContent = '';
      
      if (isOnline) {
        // API call
        const data = await sendMessage(content, sessionId);
        responseContent = data.response;
        if (data.session_id) setSessionId(data.session_id);
      } else {
        // Fallback
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        responseContent = getResponseForMessage(content);
      }

      // Add assistant message
      const assistantMsg: Message = { 
        role: 'assistant', 
        content: responseContent, 
        id: (Date.now() + 1).toString() 
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Failed to send message:', error);
      // Error message
      setMessages((prev) => [...prev, {
        role: 'assistant',
        content: "I'm having trouble connecting right now. Please try again later.",
        id: (Date.now() + 1).toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="
          flex flex-col
          w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-6rem)]
          sm:w-[480px] sm:h-[650px]
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl shadow-2xl overflow-hidden
          mb-4 animate-in fade-in slide-in-from-bottom-10 duration-300
        ">
          {/* Header */}
          <div className="absolute top-0 right-0 p-4 z-20">
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
              <IconMinus className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto scroll-smooth bg-white dark:bg-zinc-950">
            {messages.length === 0 ? (
              <SuggestionGrid onSelect={handleSendMessage} />
            ) : (
              <div className="py-6 space-y-6">
                {messages.map((msg) => (
                  <ChatBubble key={msg.id} message={msg} />
                ))}
                {isLoading && (
                  <div className="flex w-full pr-8 animate-pulse">
                    <div className="flex-1 py-2 pl-4 space-y-2">
                      <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-3/4" />
                      <div className="h-4 bg-zinc-100 dark:bg-zinc-800 rounded w-1/2" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-1" />
              </div>
            )}
          </div>

          {/* Input Area */}
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      )}

      {/* Toggle Button */}
      {!isOpen && <ChatToggle isOpen={isOpen} onClick={() => setIsOpen(true)} />}
    </div>
  );
};

export default Chat;
