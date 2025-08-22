import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1 my-2">
      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
      <div className="bg-gray-200 w-2 h-2 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
    </div>
  );
};

export default TypingIndicator;