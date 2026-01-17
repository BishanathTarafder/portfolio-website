import React, { useState } from 'react';
import { RobotIcon } from '../../icons';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl flex items-center justify-center focus:outline-none transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {!isOpen && (
        <RobotIcon className="h-8 w-8" />
      )}
    </button>
  );
};

export default ChatToggle;