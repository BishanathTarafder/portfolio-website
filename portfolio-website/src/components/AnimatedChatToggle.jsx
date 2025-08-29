import React, { useState, useEffect } from 'react';
import styles from '../chatbot/frontend/ChatWidget.module.css';
import { RobotIcon } from './icons';

const AnimatedChatToggle = ({ isOpen, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Handle animation when toggle state changes
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-14 h-14 rounded-full bg-[#6049ea] text-white shadow-lg 
        flex items-center justify-center 
        hover:bg-[#7a6af0] focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-[#6049ea] 
        transition-all duration-300 
        ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'}
        ${!isOpen && !isHovered ? styles.pulse : ''}
        ${isHovered && !isOpen ? 'animate-bounce' : ''}
      `}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      style={{
        transform: isHovered && !isOpen ? 'scale(1.1)' : 'scale(1)',
        boxShadow: isHovered && !isOpen ? '0 8px 16px rgba(96, 73, 234, 0.3)' : '0 4px 12px rgba(96, 73, 234, 0.25)',
      }}
    >
      {!isOpen && (
        <div className="relative">
          <RobotIcon className={`h-6 w-6 transition-all duration-300 ${isHovered ? 'rotate-12' : ''}`} />
          
          {/* Animated dots that appear on hover */}
          {isHovered && (
            <div className="absolute -top-1 -right-1 bg-white text-[#6049ea] rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold animate-ping">
              3
            </div>
          )}
        </div>
      )}
    </button>
  );
};

export default AnimatedChatToggle;