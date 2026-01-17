import React, { useState, useEffect, useRef } from 'react';
import ChatBubble from './ChatBubble';
import ChatInput from './ChatInput';
import ChatToggle from './ChatToggle';
import SuggestionGrid from './SuggestionGrid';
import { sendMessage, monitorBackendStatus } from '../utils/api';
import { getResponseForMessage } from '../fallback-responses';

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
          sm:w-[400px] sm:h-[600px]
          bg-white dark:bg-zinc-950
          border border-zinc-200 dark:border-zinc-800
          rounded-2xl shadow-2xl overflow-hidden
          mb-4 animate-in fade-in slide-in-from-bottom-10 duration-300
        ">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">AI Chatbot</span>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
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
                   <div className="flex w-full gap-4 pr-8 animate-pulse">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 ml-4" />
                      <div className="space-y-2 flex-1 py-2">
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
