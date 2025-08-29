import React from 'react';
import { RobotIcon } from '../../icons';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
    >
      {!isOpen && (
        <RobotIcon className="h-6 w-6" />
      )}
    </button>
  );
};

export default ChatToggle;