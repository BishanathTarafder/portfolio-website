import React, { useState, useRef, useEffect } from 'react';
import { IconArrowUp, IconSpinner } from './icons';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onSendMessage(input);
        setInput('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-end w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-white dark:bg-zinc-950 shadow-sm transition-all duration-300 ease-in-out focus-within:border-[#6049ea] focus-within:shadow-[0_0_0_2px_rgba(96,73,234,0.1)]"
      >
        <textarea
          ref={textareaRef}
          className="w-full max-h-[200px] min-h-[24px] bg-transparent border-none resize-none focus:outline-none focus:ring-0 px-2 py-1.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-500 scrollbar-hide"
          placeholder="Send a message..."
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`
            ml-2 p-1.5 rounded-lg transition-colors flex-shrink-0
            ${input.trim() && !isLoading
              ? 'bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200'
              : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 cursor-not-allowed'
            }
          `}
        >
          {isLoading ? (
            <IconSpinner className="w-4 h-4 animate-spin" />
          ) : (
            <IconArrowUp className="w-4 h-4" />
          )}
        </button>
      </form>
      <div className="text-center mt-2">
        <p className="text-[10px] text-zinc-400 dark:text-zinc-500">
          AI can make mistakes. Check important info.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
