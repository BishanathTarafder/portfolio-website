import React, { useState } from 'react';
import { RobotIcon } from '../../icons';

interface ChatToggleProps {
  isOpen: boolean;
  onClick: () => void;
}

const ChatToggle: React.FC<ChatToggleProps> = ({ isOpen, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="text-white shadow-lg flex items-center justify-center w-20 h-24 focus:outline-none transition-all duration-300"
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      style={{
        transform: isHovered && !isOpen ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered && !isOpen ? '0 8px 16px rgba(96, 73, 234, 0.3)' : '0 4px 12px rgba(96, 73, 234, 0.25)',
        background: 'transparent',
        border: 'none',
      }}
    >
      {!isOpen && (
        <RobotIcon className={`h-20 w-20 transition-all duration-300 ${isHovered ? 'rotate-12' : ''}`} />
      )}
    </button>
  );
};

export default ChatToggle;