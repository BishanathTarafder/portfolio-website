import React from 'react';
import { IconMessage, IconX } from './icons';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center w-12 h-12 rounded-full shadow-lg transition-all duration-300 hover:scale-105
        ${isOpen 
          ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700' 
          : 'bg-zinc-950 dark:bg-zinc-50 text-white dark:text-zinc-950'
        }
      `}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
        {isOpen ? (
          <IconX className="w-5 h-5" />
        ) : (
          <IconMessage className="w-5 h-5" />
        )}
      </div>
    </button>
  );
};

export default ChatToggle;
