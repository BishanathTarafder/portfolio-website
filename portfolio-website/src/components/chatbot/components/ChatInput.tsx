'use client';

import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isTyping?: boolean;
}

const MAX_CHARS = 1000;

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isTyping = false }) => {
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea as user types
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height to scrollHeight to fit content
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 150)}px`;
    }
    // Update character count
    setCharCount(message.length);
  }, [message]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isTyping) {
      onSendMessage(message);
      setMessage('');
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter (without Shift)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div className="w-full relative">
      <form onSubmit={handleSubmit} className="relative flex items-end w-full p-2 bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500/50 transition-all">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Send a message..."
          className="w-full bg-transparent border-0 focus:ring-0 resize-none py-2 pl-2 pr-10 min-h-[44px] max-h-[150px] text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 scrollbar-thin"
          aria-label="Type a message"
          maxLength={MAX_CHARS}
          disabled={isTyping}
          rows={1}
        />
        
        <div className="absolute right-2 bottom-2">
            <button 
              type="submit" 
              className={`p-2 rounded-xl transition-all duration-200 flex items-center justify-center
                ${!message.trim() || isTyping 
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                }`}
              disabled={!message.trim() || isTyping}
              aria-label="Send message"
              title="Send message"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-4 h-4"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
        </div>
      </form>
      
      {message.length > 0 && (
        <div className={`absolute -bottom-5 right-2 text-[10px] ${charCount > MAX_CHARS * 0.9 ? 'text-red-500' : 'text-zinc-400'}`}>
          {charCount}/{MAX_CHARS}
        </div>
      )}
    </div>
  );
};

export default ChatInput;