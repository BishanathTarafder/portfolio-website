import React from 'react';
import { motion } from 'framer-motion';
import { IconMessage, IconX } from './icons';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <motion.button
      key="chat-toggle"
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        fixed bottom-4 right-4 z-50
        flex items-center justify-center w-14 h-14 rounded-full shadow-xl
        backdrop-blur-sm
        ${isOpen 
          ? 'bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700' 
          : 'bg-gradient-to-br from-zinc-900 to-zinc-800 dark:from-zinc-100 dark:to-zinc-200 text-white dark:text-zinc-900'
        }
      `}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      <div className={`transition-transform duration-300 ${isOpen ? 'rotate-90' : 'rotate-0'}`}>
        {isOpen ? (
          <IconX className="w-6 h-6" />
        ) : (
          <IconMessage className="w-6 h-6" />
        )}
      </div>
    </motion.button>
  );
};

export default ChatToggle;
