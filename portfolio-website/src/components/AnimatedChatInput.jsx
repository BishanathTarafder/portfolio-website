import React, { useState, useRef, useEffect } from 'react';

const AnimatedChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  
  // Focus the input when component mounts
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  // Handle typing animation
  useEffect(() => {
    if (message.length > 0) {
      setIsTyping(true);
    } else {
      setIsTyping(false);
    }
  }, [message]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="p-3 border-t border-gray-200 bg-white rounded-b-lg">
      <form 
        onSubmit={handleSubmit} 
        className="flex items-center gap-2"
      >
        <div 
          className={`
            flex-1 relative overflow-hidden 
            transition-all duration-300 ease-out
            ${isFocused ? 'scale-[1.02]' : 'scale-100'}
          `}
        >
          <input
            ref={inputRef}
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Type your message..."
            className={`
              w-full py-2 px-4 rounded-full 
              border transition-all duration-300 
              focus:outline-none focus:ring-2 
              ${isFocused 
                ? 'border-[#6049ea] ring-[#6049ea] ring-opacity-20 shadow-sm' 
                : 'border-gray-300'}
            `}
          />
          
          {/* Animated typing indicator */}
          {isTyping && (
            <div 
              className="absolute bottom-0 left-0 h-0.5 bg-[#6049ea] rounded-full" 
              style={{
                width: `${Math.min(100, message.length * 5)}%`,
                transition: 'width 0.3s ease-out',
              }}
            />
          )}
        </div>
        
        <button
          type="submit"
          disabled={!message.trim()}
          className={`
            w-10 h-10 rounded-full flex items-center justify-center 
            transition-all duration-300 ease-out
            ${message.trim() 
              ? 'bg-[#6049ea] hover:bg-[#7a6af0] text-white shadow-md hover:shadow-lg transform hover:scale-105' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
          `}
          style={{
            transform: message.trim() ? 'scale(1)' : 'scale(0.95)',
          }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-300 ${message.trim() ? 'rotate-0' : '-rotate-45'}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default AnimatedChatInput;